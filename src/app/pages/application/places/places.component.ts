import { AbstractABM } from './../../../core/architecture/components/abstract-abm';
import { Place } from '@app/models';
import { Column } from './../../../models/table/table.model';
import { BranchesService } from './../../../core/services/branches-service.service';
import { NavigationService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subscriber } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '@app/pages/application/places/places.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent extends  AbstractABM<Place, PlacesService>  implements OnInit, OnDestroy {

  public cols: Array<Column>;
  private subsPlaces: Subscription = new Subscriber();

  constructor(public router: Router, public route: ActivatedRoute, protected placesSvc: PlacesService, protected branchesSvc: BranchesService, public nav: NavigationService) {
    super(placesSvc, nav, route)
    this.cols =  [
      {title: 'Marca', orderBy: 'tituloMarca'},
      {title: 'Departamento', orderBy: 'nombreDepartamento'},
      {title: 'Dirección', orderBy: 'direccion'}
    ];
  }

  ngOnInit() {
    this.listAll().then(() => {
      this.getPlaces();
    });
  }

  public getPlaces() {
    this.subsPlaces = this.placesSvc.getAsObservable().subscribe(() => {
      this.listItems = this.placesSvc.getValue();
    })
  }

  public addPlace(): void {
    this.nav.goto('add', this.route);
  }

  public seeDetails(id: number): void {
    this.nav.goto('details', this.route, id);
  }

  ngOnDestroy() {
    this.subsPlaces.unsubscribe();
  }

}
