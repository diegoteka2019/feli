import { Column } from '@app/models/table/table.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BenefitCategory } from '@app/models/benefit-category/benefit-category';
import { BenefitCategoryService } from './services/benefit-category.service';
import { NavigationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Subscriber } from 'rxjs';

@Component({
  selector: 'app-benefit-category',
  templateUrl: './benefit-category.component.html',
  styleUrls: ['./benefit-category.component.scss']
})
export class BenefitCategoryComponent implements OnInit, OnDestroy {

  public cols: Array<Column>;
  public benefitCategories: BenefitCategory[] = [];
  public bcSubscriber: Subscription = new Subscriber();

  constructor(private benefitCategoryService: BenefitCategoryService, private nav: NavigationService, private route: ActivatedRoute) {
    this.refresh();
    this.bcSubscriber = this.benefitCategoryService.getAsObservable().subscribe(res => {
      this.benefitCategories = res;
    });
    this.cols = [
      {
        title: 'Titulo',
        orderBy: 'tituloLargo'
      }
    ]
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.benefitCategoryService.next(null);
    this.bcSubscriber.unsubscribe();
  }

  public seeDetails(id: number): void {
    this.nav.goto("details", this.route, id);
  }

  public editBenefitCategory(id: number, event: MouseEvent): void {
    if (event) event.stopPropagation();
    this.nav.goto("edit", this.route, id);
  }

  public addBenefitCategory(): void {
    this.nav.goto("add", this.route);
  }

  public deleteCategory(id: number, event: MouseEvent): void {
    this.benefitCategoryService.deleteItem(id).subscribe(res => this.refresh());
  }

  private refresh(): void {
    this.benefitCategoryService.getAll().subscribe(res => this.benefitCategoryService.next(res))
  }

}
