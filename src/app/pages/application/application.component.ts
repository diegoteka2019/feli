import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription, Subscriber } from 'rxjs';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit, OnDestroy {

  public pageName: string;
  private subsPage: Subscription = new Subscriber();
  private subsParams: Subscription = new Subscriber();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subsParams = this.route.url.subscribe(() => {
      this.pageName = this.route.snapshot.firstChild.data.name;
    })
    this.subsPage = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd)
        this.pageName = this.route.snapshot.firstChild.data.name
    })
  }

  ngOnDestroy() {
    this.subsPage.unsubscribe();
    this.subsParams.unsubscribe();
  }

}
