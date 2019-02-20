import { BenefitCategoryService } from './../../benefit-category/services/benefit-category.service';
import { BenefitTypeService } from '@app/pages/application/benefit-type/services/benefit-type.service';
import { Branch } from './../../../../models/branches/branch.model';
import { BenefitType } from './../../../../models/benefit-category/benefit-type';
import { BenefitCategory } from '@app/models/benefit-category/benefit-category';
import { AutoCompleteData } from '@app/models/shared/auto-complete';
import { environment } from './../../../../../environments/environment.prod';
import { Validators, FormArray } from '@angular/forms';
import { AbstractABM } from '@app/core/architecture/components/abstract-abm';
import { Component, OnInit } from '@angular/core';
import { Subscription, Subscriber } from 'rxjs';
import { NavigationService, BranchesService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Benefit } from '@app/models/benefit-category/benefit';
import { BenefitService } from './../services/benefit.service';

@Component({
  selector: 'app-edit-benefit',
  templateUrl: './edit-benefit.component.html',
  styleUrls: ['./edit-benefit.component.scss']
})
export class EditBenefitComponent extends AbstractABM<Benefit, BenefitService> implements OnInit {

  public benefitGroup: FormGroup;
  private subsParams: Subscription = new Subscriber();
  private subsBenefit: Subscription = new Subscriber();

  public idBenefit: number;
  public imagePath: string;


  public selectedData: AutoCompleteData[] = [];

  private categorias: BenefitCategory[];
  private subsCategorias: Subscription = new Subscriber();
  private marcas: Branch[];
  private subsMarcas: Subscription = new Subscriber();
  private tiposBeneficio: BenefitType[];
  private subsTipoBeneficio: Subscription = new Subscriber()

  constructor(
    protected nav: NavigationService,
    public route: ActivatedRoute,
    protected benefitService: BenefitService,
    protected fb: FormBuilder,
    private marcaSvc: BranchesService,
    private tipoBeneficioSvc: BenefitTypeService,
    private catSvc: BenefitCategoryService) {

    super(benefitService, nav, route);

    this.tipoBeneficioSvc.refreshBenefitTypes();

    this.subsCategorias = this.catSvc.getAll().subscribe(res => this.categorias = res);
    this.subsMarcas = this.marcaSvc.getBranches().subscribe(res => this.marcas = res);
    this.subsTipoBeneficio = this.tipoBeneficioSvc.getAsObservable().subscribe(res => this.tiposBeneficio = res);

    this.benefitGroup = this.fb.group({
      id: [null],
      tituloLargo: [null, [Validators.required]],
      detalle: [''],
      imagen: [null],
      urlImg: [null],
      marca: this.fb.group({
        id: [null],
        titulo: [null]
      }, Validators.required),
      tipoBeneficio: this.fb.group({
        id: [null],
        titulo: [null]
      }, Validators.required),
      categorias: this.fb.array([])
    });

  }

  ngOnInit() {
    this.subsParams = this.route.params.subscribe(res => {
      this.getDetails(res.id);
      this.idBenefit = res.id;
    });
  }

  ngOnDestroy() {
    this.subsParams.unsubscribe();
    this.subsBenefit.unsubscribe();
    this.subsMarcas.unsubscribe();
    this.subsCategorias.unsubscribe();
    this.subsTipoBeneficio.unsubscribe();
  }

  public getDetails(id: number): void {
    this.subsBenefit = this.benefitService.getOne(id).subscribe(res => {
      res.categorias.forEach(() => {
        let control = <FormArray>this.benefitGroup.get('categorias');
        control.push(this.fb.group({ id: [null], tituloLargo: [null], tituloCorto: [null] }))
      })
      this.benefitGroup.setValue(res)
      this.selectedData = res.categorias.map(categoria => {
        return new AutoCompleteData().setId(categoria.id).setDisplayValue(categoria.tituloLargo)
      })
      this.imagePath = environment.baseUrl + environment.assets + res.urlImg;
    })
  }

  public setImage(image: string | ArrayBuffer | null): void {
    this.benefitGroup.get('imagen').setValue(image);
  }

  public updateBenefit(benefit: Benefit): void {
    let temp_benefit = new Benefit();
    temp_benefit = Object.assign({}, benefit);
    this.subsBenefit = this.benefitService.editItem(temp_benefit).subscribe(() => {
      this.listAll().then(() => {
        this.nav.goto('./', this.route.parent)
      })
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


}
