import { Component, OnInit } from '@angular/core';
import { Subscription, Subscriber } from 'rxjs';
import { NavigationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { BenefitCategoryService } from '../../benefit-category/services/benefit-category.service';
import { FormBuilder } from '@angular/forms';
import { AbstractBenefitTypeCrudComponent } from '../parent-classes/abstract-benefit-type';
import { BenefitTypeService } from '../services/benefit-type.service';
import { BenefitType } from '@app/models/benefit-category/benefit-type';
import { ColorUtilsService } from '@app/core/services/utils/color-utils.service';

@Component({
  selector: 'app-edit-benefit-type',
  templateUrl: './edit-benefit-type.component.html',
  styleUrls: ['./edit-benefit-type.component.scss']
})
export class EditBenefitTypeComponent extends AbstractBenefitTypeCrudComponent implements OnInit {

  public typeId: number;
  private findSubscription: Subscription = new Subscriber();
  private routeSubscription: Subscription = new Subscriber();
  private deleteSubscription: Subscription = new Subscriber();

  constructor(protected nav: NavigationService, protected route: ActivatedRoute, 
    protected btService: BenefitTypeService, protected fb: FormBuilder, protected colorUtils: ColorUtilsService) { 
      super(nav, route, btService, fb, colorUtils);
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
  public saveAction(benefitType: BenefitType): void {
    let bcCloned = BenefitType.clone(benefitType);
    if(bcCloned.backgroundColor) bcCloned.backgroundColor = bcCloned.backgroundColor.toUpperCase();
    if(bcCloned.charColor) bcCloned.charColor = bcCloned.charColor.toUpperCase();
    this.saveActionSubscription = this.btService.updateBenefitType(bcCloned).subscribe(res => {
      this.updateList();
    });
  }

  private getDetails(id: number): void{
    this.findSubscription = this.btService.findBenefitType(id).subscribe(category => {
      this.benefitTypeGroup.controls["titulo"].setValue(category.titulo);
      this.benefitTypeGroup.controls["id"].setValue(category.id);
      this.benefitTypeGroup.controls["tipo"].setValue(category.tipo);
      this.benefitTypeGroup.controls["orden"].setValue(category.orden);
      this.benefitTypeGroup.controls["backgroundColor"].setValue(category.backgroundColor);
      this.benefitTypeGroup.controls["charColor"].setValue(category.charColor);
      this.benefitTypeGroup.controls["urlImage"].setValue(category.urlImage);
      this.typeId = id;
    });
  }

  public delete(id: number, event: MouseEvent): void {
    if(event) event.stopPropagation();
    this.deleteSubscription = this.btService.deleteBenefitType(id).subscribe(res => this.updateList())
}

}
