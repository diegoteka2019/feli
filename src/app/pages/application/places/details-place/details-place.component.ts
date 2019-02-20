import { AbstractABM } from './../../../../core/architecture/components/abstract-abm';
import { NavigationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PlacesService } from '@app/pages/application/places/places.service';
import { Place } from '@app/models';

@Component({
  selector: 'app-details-place',
  templateUrl: './details-place.component.html',
  styleUrls: ['./details-place.component.scss']
})
export class DetailsPlaceComponent extends AbstractABM<Place, PlacesService> implements OnInit, OnDestroy {

  private subsParams: Subscription;
  private subsPlace: Subscription;
  public idPlace: number;

  constructor(public route: ActivatedRoute, public placesSvc: PlacesService, public nav: NavigationService) {
    super(placesSvc, nav, route)
  }

  ngOnInit() {
    this.subsParams = this.route.params.subscribe(res => {
      this.getDetails(res.id);
      this.idPlace = res.id;
    })
  }

  public getDetails(id: number): void {
    this.subsPlace = this.placesSvc.getOne(id).subscribe(res => {
      this.item = res;
    })
  }

  ngOnDestroy() {
    this.subsPlace.unsubscribe();
    this.subsParams.unsubscribe();
  }
}
