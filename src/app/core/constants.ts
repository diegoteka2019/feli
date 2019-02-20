import { HttpHeaders } from "@angular/common/http";

//TOKEN
export const TOKEN_HEADER = "sms_token";
export const TOKEN_PREFIX = "Bearer "; 

//APP
// export const APP_URL = "https://api.samsungclub.com.uy/";
export const DEFAULT_HEADERS = new HttpHeaders({
    'Content-Type': 'application/json'
  });