import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Page } from '@app/models';
import { Subscription, Subscriber } from 'rxjs';

export abstract class AbstractLateralBar implements OnInit, OnDestroy {

    @Input() public pages: Array<Page>;
    @Output() public pageButtonEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() public menuButtonEvent: EventEmitter<void> = new EventEmitter<void>();

    private onInitAbs: any;
    private onDestroyAbs: any;
    private subsParams: Subscription = new Subscriber();
    private subsUrl: Subscription = new Subscriber();

    constructor(protected router: Router, protected route: ActivatedRoute) {
        this.refactorInit();
        this.refactorDestroy();
    }

    public menuButtonClick(): void {
        this.menuButtonEvent.emit();
    }

    public goTo(url: string): void {
        this.pageButtonEvent.emit(url);
    }

    public changePage(): void {
        this.subsUrl = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.selectPage();
            }
        })
    }

    public selectPage() {
        this.pages.forEach(page => {
            if (page.name === this.route.snapshot.firstChild.firstChild.data.name)
                page.selected = true;
            else
                page.selected = false;
        })
    }

    public refactorDestroy() {
        this.onDestroyAbs = this.ngOnDestroy;
        this.ngOnDestroy = () => {
            this.onDestroyAbs();
            this.subsUrl.unsubscribe();
            this.subsParams.unsubscribe();
        }
    }
    public refactorInit() {
        this.onInitAbs = this.ngOnInit;
        this.ngOnInit = () => {
            this.onInitAbs();
            this.changePage();
            this.subsParams = this.route.url.subscribe(() => {
                this.selectPage();
            })
        }
    }

    ngOnInit() { }

    ngOnDestroy() { }


}