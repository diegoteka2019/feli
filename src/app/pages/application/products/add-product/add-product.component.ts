import { Category } from './../../../../models/categories/category.model';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Subscriber } from 'rxjs';
import { ProductService } from '@app/pages/application/products/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@app/models/product/product';
import { CategoriesService } from '../../categories/categories.service';
import { AutoCompleteData } from '@app/models/shared/auto-complete';
import { NavigationService } from '@app/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {

  public productGroup: FormGroup;

  private subsProduct: Subscription = new Subscriber();
  private subsListProduct: Subscription = new Subscriber();

  public categories: Category[];
  private subsCategories: Subscription = new Subscriber();

  constructor(
    protected fb: FormBuilder,
    protected productsSvc: ProductService,
    protected categoriesSvc: CategoriesService,
    protected nav: NavigationService,
    protected route: ActivatedRoute) {

    this.productGroup = this.fb.group({
      id: [null],
      titulo: [null, [Validators.required]],
      sku: [null],
      idCategoriaProductoSamsung: [null, [Validators.required]],
    })

    this.subsCategories = this.categoriesSvc.getAll().subscribe(res => this.categories = res);

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subsProduct.unsubscribe();
    this.subsListProduct.unsubscribe();
    this.subsCategories.unsubscribe();
  }

  public setImage(image: string | ArrayBuffer | null): void {
    this.productGroup.get('imagen').setValue(image);
  }

  public addProduct(product: Product): void {
    let temp_product = Product.clone(product);
    this.subsProduct = this.productsSvc.addItem(temp_product).subscribe(() => {
      this.updateList();
    });
  }

  public updateList(): void {
    this.subsListProduct = this.productsSvc.getAll().subscribe(res => {
      this.productsSvc.next(res);
      this.close();
    });
  }

  public close(): void {
    this.nav.goto('./', this.route.parent)
  }

  public get toAutoCompleteData(): AutoCompleteData[] {
    return !!this.categories ?
      this.categories.map(category => new AutoCompleteData().setId(category.id).setDisplayValue(category.titulo)) : null;
  }

}
