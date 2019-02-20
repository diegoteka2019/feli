import { BenefitCategory } from '@app/models/benefit-category/benefit-category';
import { BenefitCategoryService } from './../../benefit-category/services/benefit-category.service';
import { BenefitType } from './../../../../models/benefit-category/benefit-type';
import { BranchesService } from './../../../../core/services/branches-service.service';
import { Branch } from './../../../../models/branches/branch.model';
import { Subscription } from 'rxjs';
import { Subscriber } from 'rxjs';
import { FormGroup, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BenefitService } from '../services/benefit.service';
import { Benefit } from '@app/models/benefit-category/benefit';
import { AutoCompleteData } from '@app/models/shared/auto-complete';
import { BenefitTypeService } from '@app/pages/application/benefit-type/services/benefit-type.service';

@Component({
  selector: 'app-add-benefit',
  templateUrl: './add-benefit.component.html',
  styleUrls: ['./add-benefit.component.scss']
})
export class AddBenefitComponent implements OnInit, OnDestroy {

  public benefitGroup: FormGroup;

  private subsBenefit: Subscription = new Subscriber();
  private subsListBenefit: Subscription = new Subscriber();

  public selectedData: AutoCompleteData[] = [];

  private categorias: BenefitCategory[];
  private subsCategorias: Subscription = new Subscriber();
  private marcas: Branch[];
  private subsMarcas: Subscription = new Subscriber();
  private tiposBeneficio: BenefitType[];
  private subsTipoBeneficio: Subscription = new Subscriber();

  public constructor(
    protected nav: NavigationService,
    protected route: ActivatedRoute,
    protected benefitService: BenefitService,
    protected fb: FormBuilder,
    private marcaSvc: BranchesService,
    private tipoBeneficioSvc: BenefitTypeService,
    private catSvc: BenefitCategoryService) {

    this.tipoBeneficioSvc.refreshBenefitTypes();

    this.subsCategorias = this.catSvc.getAll().subscribe(res => this.categorias = res);
    this.subsMarcas = this.marcaSvc.getBranches().subscribe(res => this.marcas = res);
    this.subsTipoBeneficio = this.tipoBeneficioSvc.getAsObservable().subscribe(res => this.tiposBeneficio = res);

    this.benefitGroup = this.fb.group({
      id: [null],
      tituloLargo: [null, [Validators.required]],
      detalle: [''],
      imagen: [null, [Validators.required]],
      urlImg: [null],
      marca: this.fb.group({
        id: [null]
      }, Validators.required),
      tipoBeneficio: this.fb.group({
        id: [null]
      }, Validators.required),
      categorias: this.fb.array([
        this.fb.group({ id: [null] })
      ])
    });

  }

  public get autoCompleteCategoryData(): AutoCompleteData[] {
    return this.categorias ? this.categorias.map(categoria => new AutoCompleteData().setId(categoria.id).setDisplayValue(categoria.tituloLargo)) : null;
  }
  public get autoCompleteBranchData(): AutoCompleteData[] {
    return this.marcas ? this.marcas.map(marca => new AutoCompleteData().setId(marca.id).setDisplayValue(marca.titulo)) : null;
  }
  public get autoCompleteTipoData(): AutoCompleteData[] {
    return this.tiposBeneficio ? this.tiposBeneficio.map(tipo => new AutoCompleteData().setId(tipo.id).setDisplayValue(tipo.titulo)) : null;
  }

  public updateData(list: Array<any>): void {
    let control = <FormArray>this.benefitGroup.get('categorias');
    control.reset();
    control.controls.splice(0, control.controls.length);
    list.forEach(item => {
      control.push(this.fb.group(item));
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subsBenefit.unsubscribe();
    this.subsListBenefit.unsubscribe();
    this.subsMarcas.unsubscribe();
    this.subsCategorias.unsubscribe();
    this.subsTipoBeneficio.unsubscribe();
  }

  public setImage(image: string | ArrayBuffer | null): void {
    this.benefitGroup.get('imagen').setValue(image);
  }

  public addBenefit(benefit: Benefit): void {
    let temp_benefit = new Benefit();
    temp_benefit = Object.assign({}, benefit);
    this.subsBenefit = this.benefitService.addItem(temp_benefit).subscribe(() => {
      this.updateList();
    });
  }

  public updateList(): void {
    this.subsListBenefit = this.benefitService.getAll().subscribe(res => {
      this.benefitService.next(res);
      this.close();
    });
  }

  public close(): void {
    this.nav.goto('./', this.route.parent)
  }


}
