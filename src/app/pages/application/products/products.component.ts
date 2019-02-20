import { AbstractABM } from '@app/core/architecture/components/abstract-abm';
import { Column } from '@app/models/table/table.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '@app/models/product/product';
import { ProductService } from '@app/pages/application/products/product.service';
import { Subscription, Subscriber } from 'rxjs';
import { NavigationService } from '@app/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends AbstractABM<Product, ProductService> implements OnInit, OnDestroy {

  public productos: Product[];
  private getAsObservableSubscription: Subscription = new Subscriber();
  private deleteProductSubscription: Subscription = new Subscriber();

  private subsProducts: Subscription = new Subscriber();

  public cols: Array<Column>;

  constructor(
    protected nav: NavigationService,
    public route: ActivatedRoute,
    protected productService: ProductService) {
    super(productService, nav, route);

    this.cols = [
      { title: 'Título', orderBy: 'titulo' }     
    ]
  }

  ngOnInit() {
    this.listAll().then(() => {
      this.getProducts();
    });
  }

  public getProducts() {
    this.subsProducts = this.productService.getAsObservable().subscribe(() => {
      this.listItems = this.productService.getValue();
    })
  }

  public addProduct(): void {
    this.nav.goto('add', this.route);
  }

  public seeDetails(id: number): void {
    this.nav.goto('details', this.route, id);
  }

  ngOnDestroy() {
    this.subsProducts.unsubscribe();
  }



}
