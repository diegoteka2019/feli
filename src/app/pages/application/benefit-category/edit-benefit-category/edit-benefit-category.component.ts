import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractBenefitCategoty } from '../parent-classes/abstract-benefit-category';
import { NavigationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { BenefitCategoryService } from '../services/benefit-category.service';
import { FormBuilder } from '@angular/forms';
import { BenefitCategory } from '@app/models/benefit-category/benefit-category';
import { Subscription, Subscriber } from 'rxjs';

@Component({
  selector: 'app-edit-benefit-category',
  templateUrl: './edit-benefit-category.component.html',
  styleUrls: ['./edit-benefit-category.component.scss']
})
export class EditBenefitCategoryComponent extends AbstractBenefitCategoty implements OnInit, OnDestroy {

  public categoryId: number;
  private findSubscription: Subscription = new Subscriber();
  private routeSubscription: Subscription = new Subscriber();
  private deleteSubscription: Subscription = new Subscriber();

  constructor(protected nav: NavigationService, protected route: ActivatedRoute, 
    protected bcService: BenefitCategoryService, protected fb: FormBuilder) { 
      super(nav, route, bcService, fb);
      this.routeSubscription = this.route.params.subscribe(res => {
         this.getDetails(res.id);
      });
    }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.findSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }

  /** Abstract method implementation */
  public saveAction(benefitCategory: BenefitCategory): void {
    let bcCloned = BenefitCategory.clone(benefitCategory);
    this.saveActionSubscription = this.bcService.editItem(bcCloned).subscribe(res => {
      this.updateList();
    });
  }

  private getDetails(id: number): void{
    this.findSubscription = this.bcService.getOne(id).subscribe(category => {
      this.benefitCategoryGroup.controls["id"].setValue(category.id);
      this.benefitCategoryGroup.controls["tituloLargo"].setValue(category.tituloLargo);
      this.benefitCategoryGroup.controls["tituloCorto"].setValue(category.tituloCorto);
      this.categoryId = category.id;
    });
  }

  public delete(id: number, event: MouseEvent): void {
    if(event) event.stopPropagation();
    this.deleteSubscription = this.bcService.deleteItem(id).subscribe(res => this.updateList())
}



}
