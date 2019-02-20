import { Subscriber } from 'rxjs';
import { Subscription } from 'rxjs';
import { AbstractABM } from '@app/core/architecture/components/abstract-abm';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Benefit } from '@app/models/benefit-category/benefit';
import { Column } from '@app/models';
import { BenefitService } from './services/benefit.service';
import { NavigationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.scss']
})
export class BenefitComponent extends AbstractABM<Benefit, BenefitService> implements OnInit, OnDestroy {

  public cols: Array<Column>;
  private subsBenefits: Subscription = new Subscriber()

  constructor(protected benefitService: BenefitService, protected nav: NavigationService, public route: ActivatedRoute) {

    super(benefitService, nav, route)

    this.cols = [
      {
        title: 'Titulo',
        orderBy: 'tituloLargo'
      },
      {
        title: 'Tipo de Beneficio',
        orderBy: 'tituloTipoBeneficio',
        align: 'center'
      },
      {
        title: 'Marca',
        orderBy: 'tituloMarca'
      },
    ]
  }

  ngOnInit() {
    this.listAll().then(() => {
      this.getBenefits();
    });
  }

  public getBenefits() {
    this.subsBenefits = this.benefitService.getAsObservable().subscribe(() => {
      this.listItems = this.benefitService.getValue();
    })
  }

  public addBenefit(): void {
    this.nav.goto('add', this.route);
  }

  public seeDetails(id: number): void {
    this.nav.goto('details', this.route, id);
  }

  ngOnDestroy() {
    this.subsBenefits.unsubscribe();
  }


}
