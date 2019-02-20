import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { BenefitType } from '@app/models/benefit-category/benefit-type';
import { BenefitTypeService } from './services/benefit-type.service';
import { Column } from '@app/models';
import { Subscription, Subscriber } from 'rxjs';

@Component({
  selector: 'app-benefit-type',
  templateUrl: './benefit-type.component.html',
  styleUrls: ['./benefit-type.component.scss']
})
export class BenefitTypeComponent implements OnInit, OnDestroy {

  public cols: Array<Column>;  
  public searchBox: string = '';
  public benefitTypes: BenefitType[];
  public btSubscription: Subscription = new Subscriber();

  constructor(private benefitTypeService: BenefitTypeService, private nav: NavigationService, private route: ActivatedRoute) {
    this.benefitTypeService.refreshBenefitTypes();
    this.btSubscription = benefitTypeService.getAsObservable().subscribe(res => {
      this.benefitTypes = res;
    });
    this.cols = [
      {title: 'Titulo', orderBy: "titulo"}, 
      {title: "Tipo", orderBy: "tipo"}, 
      {title:"Color de fondo", orderBy: "backgroundColor"}, 
      {title:"Color de letra", orderBy: "charColor"}
    ]
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.benefitTypeService.next(null);
    this.btSubscription.unsubscribe();
  }

  public seeDetails(id: number): void {
    this.nav.goto("details", this.route, id);
  }
  
  public editBenefitType(id: number, event: MouseEvent): void {
    if(event) event.stopPropagation();
    this.nav.goto("edit", this.route, id);
  }
  
  public addBenefitType(): void {
    this.nav.goto("add", this.route);
  }

  public deleteType(id: number, event: MouseEvent): void {
    if(event) event.stopPropagation();
    this.benefitTypeService.deleteBenefitType(id).subscribe(res => this.benefitTypeService.refreshBenefitTypes());
  }

}
