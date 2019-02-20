import { Subscriber } from 'rxjs';
import { Subscription } from 'rxjs';
import { Column } from '@app/models/table/table.model';
import { NavigationService } from '@app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BenefitScheduleService } from './benefit-schedule.service';
import { BenefitSchedule } from '@app/models/benefit-category/benefit-schedule.model';
import { AbstractABM } from '@app/core/architecture/components/abstract-abm';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-benefit-schedule',
  templateUrl: './benefit-schedule.component.html',
  styleUrls: ['./benefit-schedule.component.scss']
})
export class BenefitScheduleComponent extends AbstractABM<BenefitSchedule, BenefitScheduleService> implements OnInit, OnDestroy {

  public cols: Array<Column>;
  private subsSchedule: Subscription = new Subscriber();

  constructor(public router: Router,
    public route: ActivatedRoute,
    public scheduleSvc: BenefitScheduleService,
    public nav: NavigationService) {

    super(scheduleSvc, nav, route)
    this.cols = [
      {
        title: 'Benefício',
        orderBy: 'tituloBeneficio'
      },
      {
        title: 'Marca',
        orderBy: 'tituloMarca'
      },
      {
        title: 'Desde',
        orderBy: 'fechaDesde'
      },
      {
        title: 'Hasta',
        orderBy: 'fechaHasta'
      },
      {
        title: 'Status',
        orderBy: null
      }
    ]
  }

  ngOnInit() {
    this.listAll().then(() => {
      this.getSchedule();
    });
  }

  public getSchedule() {
    this.subsSchedule = this.scheduleSvc.getAsObservable().subscribe(() => {
      this.listItems = this.scheduleSvc.getValue();
    })
  }

  public addSchedule(): void {
    this.nav.goto('add', this.route);
  }

  public seeDetails(id: number): void {
    this.nav.goto('details', this.route, id);
  }

  ngOnDestroy() {
    this.subsSchedule.unsubscribe();
  }

  public isActive(dateFrom: string, dateTo: string): boolean {
    let temp_dateFrom = new Date(dateFrom);
    let temp_dateTo = new Date(dateTo);
    let today = new Date();
    return (today > temp_dateFrom && today < temp_dateTo)
  }

}
