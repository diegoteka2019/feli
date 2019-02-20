import { environment } from './../../../../../environments/environment.prod';
import { AbstractABM } from '@app/core/architecture/components/abstract-abm';
import { Subscription, Subscriber } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Benefit } from '@app/models/benefit-category/benefit';
import { NavigationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { BenefitService } from '../services/benefit.service';

@Component({
  selector: 'app-details-benefit',
  templateUrl: './details-benefit.component.html',
  styleUrls: ['./details-benefit.component.scss']
})
export class DetailsBenefitComponent extends AbstractABM<Benefit, BenefitService> implements OnInit, OnDestroy {

  private subsParams: Subscription = new Subscriber();
  private subsBenefit: Subscription = new Subscriber();
  public idBenefit: number;

  public imagePath: string;

  constructor(protected nav: NavigationService, public route: ActivatedRoute, protected benefitService: BenefitService) {
    super(benefitService, nav, route)
  }

  ngOnInit() {
    this.subsParams = this.route.params.subscribe(res => {
      this.getDetails(res.id);
      this.idBenefit = res.id;
    })
  }
  
  public getDetails(id: number): void {
    this.subsBenefit = this.benefitService.getOne(id).subscribe(res => {
      this.item = res;
      this.imagePath = environment.baseUrl + environment.assets + res.urlImg;
    })
  }

  ngOnDestroy() {
    this.subsBenefit.unsubscribe();
    this.subsParams.unsubscribe();
  }


}
