import { Branch } from './../../../../models/branches/branch.model';
import { AutoCompleteData } from '@app/models/shared/auto-complete';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from '@app/pages/application/places/places.service';
import { Subscription, Subscriber } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService, BranchesService } from '@app/core';
import { Place } from '@app/models';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit, OnDestroy {

  public placeGroup: FormGroup;

  private subsPlace: Subscription = new Subscriber();
  private subsListPlaces: Subscription = new Subscriber();

  /**
  * Util vars
  */
  public branches: Array<Branch>;
  //TODO
  public departamentos: Array<any>;

  private subsListBranches: Subscription = new Subscriber();
  private subsListDepartaments: Subscription = new Subscriber();
  private subsBranch: Subscription = new Subscriber();

  private ngOnDestroyParent: () => void;

  constructor(
    private fb: FormBuilder,
    protected placesSvc: PlacesService,
    protected nav: NavigationService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected branchesSvc: BranchesService) {
    this.placeGroup = this.fb.group({
      direccion: [null, [Validators.required]],
      horario: [null, [Validators.required]],
      telefono: [''],
      //TODO
      latitud: ['-34.86336'],
      longitud: ['-56.153795'],
      idMarca: [null, [Validators.required]],
      idDepartamento: [null, [Validators.required]],
    })

    this.getAllBranches();
    this.getAllDepartaments();
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subsPlace.unsubscribe();
    this.subsListPlaces.unsubscribe();
    this.subsListBranches.unsubscribe();
    this.subsListDepartaments.unsubscribe();
    this.subsBranch.unsubscribe();
  }

  public addPlace(place: Place): void {
    let temp_place = Place.clone(place);
    this.subsPlace = this.placesSvc.addItem(temp_place).subscribe(() => {
      this.updateList();
    });
  }

  public updateList(): void {
    this.subsListPlaces = this.placesSvc.getAll().subscribe(res => {
      this.placesSvc.next(res);
      this.close();
    });
  }

  public close() {
    this.nav.goto('./', this.route.parent);
  }


  /**
   * Util methods
   */

  public get autocompleteBranchData(): AutoCompleteData[] {
    return !!this.branches ?
      this.branches.map(branch => new AutoCompleteData().setId(branch.id).setDisplayValue(branch.titulo)) : null;
  }
  public get autocompleteDepartamentData(): AutoCompleteData[] {
    return !!this.departamentos ?
      this.departamentos.map(dpto => new AutoCompleteData().setId(dpto.id).setDisplayValue(dpto.nombre)) : null;
  }

  public getAllBranches(): void {
    this.subsListBranches = this.branchesSvc.getBranches().subscribe(res => {
      this.branches = res;
    })
  }

  public getBranch(id: number): Promise<Branch> {
    return new Promise<Branch>(resolve => {
      this.subsBranch = this.branchesSvc.getBranch(id).subscribe(res => {
        resolve(res);
      })
    })
  }

  public getBranchById(id: number): Branch | string {
    let ret: Branch | string = '';
    this.getBranch(id).then(res => {
      ret = res;
    })
    return ret;
  }

  public getAllDepartaments(): void {
    this.subsListDepartaments = this.placesSvc.getAllDepartments().subscribe(res => {
      this.departamentos = res;
    })
  }


}
