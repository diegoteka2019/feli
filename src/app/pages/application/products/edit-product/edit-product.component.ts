import { environment } from 'src/environments/environment';
import { AbstractABM } from './../../../../core/architecture/components/abstract-abm';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription, Subscriber } from 'rxjs';
import { ProductService } from '@app/pages/application/products/product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../categories/categories.service';
import { Product } from '@app/models/product/product';
import { AutoCompleteData } from '@app/models/shared/auto-complete';
import { Category } from '@app/models/categories/category.model';
import { NavigationService } from '@app/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent extends AbstractABM<Product, ProductService> implements OnInit {


  public productGroup: FormGroup;

  private subsProduct: Subscription = new Subscriber();
  private subsParams: Subscription = new Subscriber();

  public categories: Category[];
  private subsCategories: Subscription = new Subscriber();

  public idProducto: number;

  constructor(
    protected fb: FormBuilder,
    protected productService: ProductService,
    protected categoryService: CategoriesService,
    protected nav: NavigationService,
    public route: ActivatedRoute) {

    super(productService, nav, route);


    this.productGroup = this.fb.group({
      id: [null],
      titulo: [null, [Validators.required]],
      sku: [null],
      idCategoriaProductoSamsung: [null, [Validators.required]]
    })

    this.subsCategories = this.categoryService.getAll().subscribe(res => this.categories = res);

  }

  ngOnInit() {
    this.subsParams = this.route.params.subscribe(res => {
      this.getDetails(res.id);
      this.idProducto = res.id;
    });
  }

  ngOnDestroy() {
    this.subsParams.unsubscribe();
    this.subsProduct.unsubscribe();
    this.subsCategories.unsubscribe();
  }

  public getDetails(id: number): void {
    this.subsProduct = this.productService.getOne(id).subscribe(res => {
      this.productGroup.setValue(res)
    })
  }

  public setImage(image: string | ArrayBuffer | null): void {
    this.productGroup.get('imagen').setValue(image);
  }

  public updateProduct(product: Product): void {
    let temp_product = Product.clone(product);
    this.subsProduct = this.productService.editItem(temp_product).subscribe(() => {
      this.listAll().then(() => {
        this.nav.goto('./', this.route.parent)
      })
    });
  }

  public get toAutoCompleteData(): AutoCompleteData[] {
    return !!this.categories ?
      this.categories.map(category => new AutoCompleteData().setId(category.id).setDisplayValue(category.titulo)) : null;
  }

}
