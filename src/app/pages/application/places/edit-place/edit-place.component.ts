import { AutoCompleteData } from '@app/models/shared/auto-complete';
import { Branch } from './../../../../models/branches/branch.model';
import { NavigationService, BranchesService } from '@app/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscriber } from 'rxjs';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PlacesService } from './../places.service';
import { Place } from '@app/models/places/place.model';
import { AbstractABM } from '@app/core/architecture/components/abstract-abm';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.scss']
})
export class EditPlaceComponent extends AbstractABM<Place, PlacesService> implements OnInit, OnDestroy {

  public placeGroup: FormGroup;
  private subsParams: Subscription = new Subscriber();
  private subsPlace: Subscription = new Subscriber();

  public idPlace: number;
  public imagePath: string;

  /**
  * Util vars
  */
  public branches: Array<Branch>;
  //TODO
  public departamentos: Array<any>;

  private subsListBranches: Subscription = new Subscriber();
  private subsListDepartaments: Subscription = new Subscriber();
  private subsBranch: Subscription = new Subscriber();

  constructor(
    private fb: FormBuilder,
    public placesSvc: PlacesService,
    public branchesSvc: BranchesService,
    public route: ActivatedRoute,
    public nav: NavigationService) {
    super(placesSvc, nav, route)

    this.placeGroup = this.fb.group({
      idLocal: [null, [Validators.required]],
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

  ngOnInit() {
    this.subsParams = this.route.params.subscribe(res => {
      this.getDetails(res.id);
      this.idPlace = res.id;
    });
  }

  ngOnDestroy() {
    this.subsParams.unsubscribe();
    this.subsPlace.unsubscribe();
    this.subsListBranches.unsubscribe();
    this.subsListDepartaments.unsubscribe();
    this.subsBranch.unsubscribe();
  }

  public getDetails(id: number): void {
    this.subsPlace = this.placesSvc.getOne(id).subscribe(res => {
      this.placeGroup.get('idLocal').setValue(res.idLocal);
      this.placeGroup.get('idMarca').setValue(res.idMarca);
      this.placeGroup.get('idDepartamento').setValue(res.idDepartamento);
      this.placeGroup.get('direccion').setValue(res.direccion);
      this.placeGroup.get('horario').setValue(res.horario);
      this.placeGroup.get('telefono').setValue(res.telefono);
      this.placeGroup.get('latitud').setValue(res.latitud);
      this.placeGroup.get('longitud').setValue(res.longitud);

    })
  }

  public updatePlace(place: Place): void {
    let temp_place = Place.clone(place);
    delete temp_place.idMarca;
    this.subsPlace = this.placesSvc.editItem(temp_place).subscribe(() => {
      this.listAll().then(() => {
        this.nav.goto('./', this.route.parent)
      })
    });
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
