import { NavigationService } from './../../core/services/navigation/navigation.service';
import { Page } from '@app/models';
import { APP_PAGES } from '@app/constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lateral-bar',
  templateUrl: './lateral-bar.component.html',
  styleUrls: ['./lateral-bar.component.scss']
})
export class LateralBarComponent implements OnInit {

  public pages: Array<Page> = [];
  public isLarge: boolean = true;

  constructor(private nav: NavigationService) { 
  }

  ngOnInit() {
    this.pages = this.nav.toPagesArray(APP_PAGES);    
  }

  public goto(url: string): void {
    this.nav.goto(url)
  }
  
  public changeMenu(): void {
    this.isLarge = ! this.isLarge;
  }

}
