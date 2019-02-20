### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:10-alpine as builder

ARG ENVIRONMENT
ARG BASE_HREF

ENV ENVIRONMENT ${ENVIRONMENT:-production}
ENV BASE_HREF ${BASE_HREF:-/samsung-beneficios-backoffice/}

COPY package.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force && apk update && apk add git

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod --configuration=$ENVIRONMENT --base-href=$BASE_HREF


### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

## TODO: Fix this from NGINX to load fonts
COPY --from=builder /ng-app/dist /usr/share/nginx/html/samsung-beneficios-backoffice

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]