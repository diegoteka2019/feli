import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BenefitCategoryService } from '../services/benefit-category.service';
import { NavigationService } from '@app/core';
import { Subscription, Subscriber } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AbstractBenefitCategoty } from '../parent-classes/abstract-benefit-category';
import { BenefitCategory } from '@app/models/benefit-category/benefit-category';

@Component({
  selector: 'app-add-benefit-category',
  templateUrl: './add-benefit-category.component.html',
  styleUrls: ['./add-benefit-category.component.scss']
})
export class AddBenefitCategoryComponent extends AbstractBenefitCategoty implements OnInit {


  constructor(protected fb: FormBuilder, protected bcService: BenefitCategoryService,
    protected nav: NavigationService, protected route: ActivatedRoute) {
    super(nav, route, bcService, fb);
  }

  ngOnInit() { }

  /** Abstract method implementation */
  public saveAction(benefitCategory: BenefitCategory): void {
    let bcCloned = BenefitCategory.clone(benefitCategory);
    this.saveActionSubscription = this.bcService.addItem(bcCloned).subscribe(res => {
      this.updateList();
    });
  }

}
