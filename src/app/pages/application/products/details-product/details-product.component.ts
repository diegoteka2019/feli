import { AbstractABM } from './../../../../core/architecture/components/abstract-abm';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Product } from '@app/models/product/product';
import { Subscription } from 'rxjs';
import { ProductService } from '@app/pages/application/products/product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../categories/categories.service';
import { Category } from '@app/models/categories/category.model';
import { NavigationService } from '@app/core';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss']
})
export class DetailsProductComponent extends AbstractABM<Product, ProductService> implements OnInit, OnDestroy {

  private subsCategory: Subscription;

  private subsParams: Subscription;
  private subsProduct: Subscription;
  public idProduct: number;

  public category: Category;
  

  constructor(
    protected nav: NavigationService,
    public route: ActivatedRoute,
    protected productService: ProductService,
    private categoryService: CategoriesService) {
    super(productService, nav, route);
  }

  ngOnInit() {
    this.subsParams = this.route.params.subscribe(res => {
      this.getDetails(res.id);
      this.idProduct = res.id;
    })
  }

  public getDetails(id: number): void {
    this.subsProduct = this.productService.getOne(id).subscribe(res => {
      this.item = res;
      this.subsCategory = this.categoryService.getOne(this.item.idCategoriaProductoSamsung)
        .subscribe(res => this.category = res);
    })
  }

  ngOnDestroy() {
    this.subsCategory.unsubscribe();
    this.subsProduct.unsubscribe();
    this.subsParams.unsubscribe();
  }


}
