import { ActionParams } from '@app/core/architecture/components/abstract-abm';
import { ActivatedRoute } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { OnDestroy, Inject } from "@angular/core";
import { NavigationService } from '@app/core';
import { Crudeable } from '@app/core/architecture/components/abstract-crud-interface';

export class AbstractABM<T, K extends Crudeable<T>> implements OnDestroy {

        public listItems: Array<T> = [];
        public item: T;

        private subsList: Subscription = new Subscriber();
        private subsItem: Subscription = new Subscriber();

        protected ngOnDestroyParent: () => void;

        protected abmService: K;

        constructor(protected _abmService: K, protected nav: NavigationService, public route: ActivatedRoute) {
                this.abmService = _abmService;
                this.overrideDestroy()
        }


        public listAll(): Promise<boolean> {
                return new Promise((resolve, reject) => {
                        this.subsList = this.abmService.getAll().subscribe(res => {
                                if (res) {
                                        this.abmService.next(res)
                                        resolve(true);
                                }
                        })
                })
        }

        public deleteItem(id: number, event?: MouseEvent): void {
                if (event) event.stopPropagation();
                this.subsItem = this.abmService.deleteItem(id).subscribe(() => {
                        this.listAll().then(res => {
                                if (!event)
                                        this.nav.goto('./', this.route.parent)

                        })
                })
        }

        public editItem(id: number, options: ActionParams): void {
                let route = options.route || this.route;
                if (options.event) options.event.stopPropagation();
                this.nav.goto('edit', route, id)
        }

        private destroyAllSubscribes() {
                this.subsList.unsubscribe();
                this.subsItem.unsubscribe();
        }

        private overrideDestroy() {
                this.ngOnDestroyParent = this.ngOnDestroy;
                this.ngOnDestroy = () => {
                        this.ngOnDestroyParent();
                        this.destroyAllSubscribes();
                }
        }
        ngOnDestroy() {
        }
}

export interface ActionParams{
        route?: ActivatedRoute;
        event?: MouseEvent
}