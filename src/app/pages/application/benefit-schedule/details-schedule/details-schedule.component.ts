import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractABM } from './../../../../core/architecture/components/abstract-abm';
import { BenefitScheduleService } from './../benefit-schedule.service';
import { BenefitSchedule } from '@app/models/benefit-category/benefit-schedule.model';
import { NavigationService } from '@app/core';
import { SanitizeHtmlPipe } from './../../../../pipes/html.pipe';

@Component({
  selector: 'app-details-schedule',
  templateUrl: './details-schedule.component.html',
  styleUrls: ['./details-schedule.component.scss']
})
export class DetailsScheduleComponent extends AbstractABM<BenefitSchedule, BenefitScheduleService> implements OnInit, OnDestroy {

  private subsParams: Subscription;
  private subsSchedule: Subscription;
  public idSchedule: number;

  public imagePath: string;

  constructor(public route: ActivatedRoute, public scheduleSvc: BenefitScheduleService, public nav: NavigationService) {
    super(scheduleSvc, nav, route)
  }

  ngOnInit() {
    this.subsParams = this.route.params.subscribe(res => {
      this.getDetails(res.id);
      this.idSchedule = res.id;
    })
  }

  public getDetails(id: number): void {
    this.subsSchedule = this.scheduleSvc.getOne(id).subscribe(res => {
      this.item = res;
      if (res.beneficio.urlImg)
        this.imagePath = environment.baseUrl + environment.assets + res.beneficio.urlImg;
    })
  }

  ngOnDestroy() {
    this.subsSchedule.unsubscribe();
    this.subsParams.unsubscribe();
  }

}
