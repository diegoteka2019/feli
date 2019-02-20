import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BenefitTypeService } from '../services/benefit-type.service';
import { AbstractBenefitTypeCrudComponent } from '../parent-classes/abstract-benefit-type';
import { BenefitType } from '@app/models/benefit-category/benefit-type';
import { ColorUtilsService } from '@app/core/services/utils/color-utils.service';

@Component({
  selector: 'app-add-benefit-type',
  templateUrl: './add-benefit-type.component.html',
  styleUrls: ['./add-benefit-type.component.scss']
})
export class AddBenefitTypeComponent extends AbstractBenefitTypeCrudComponent implements OnInit {


  public constructor(protected nav: NavigationService, protected route: ActivatedRoute,
    protected btService: BenefitTypeService, protected fb: FormBuilder, protected colorUtils: ColorUtilsService) {
      super(nav, route, btService, fb, colorUtils);
}

  ngOnInit() {
  }

  public saveAction(benefitType: BenefitType): void {
    let benefitTypeCloned = BenefitType.clone(benefitType);
    if(benefitTypeCloned.backgroundColor) benefitTypeCloned.backgroundColor = benefitTypeCloned.backgroundColor.toUpperCase();
    if(benefitTypeCloned.charColor) benefitTypeCloned.charColor = benefitTypeCloned.charColor.toUpperCase();
    this.btService.createBenefitType(BenefitType.clone(benefitTypeCloned)).subscribe(res => this.updateList())
  }



}
