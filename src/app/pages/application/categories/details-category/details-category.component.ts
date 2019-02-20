import { environment } from './../../../../../environments/environment';
import { AbstractABM } from '@app/core/architecture/components/abstract-abm';
import { NavigationService } from '@app/core';
import { Subscription } from 'rxjs';
import { Category } from '@app/models/categories/category.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-details-category',
  templateUrl: './details-category.component.html',
  styleUrls: ['./details-category.component.scss']
})
export class DetailsCategoryComponent extends AbstractABM<Category, CategoriesService> implements OnInit, OnDestroy {

  private subsParams: Subscription;
  private subsCategory: Subscription;
  public idCategory: number;

  public imagePath: string;

  constructor(public route: ActivatedRoute, public categoriesSvc: CategoriesService,  public nav: NavigationService) {
    super(categoriesSvc, nav, route)
  }

  ngOnInit() {
    this.subsParams = this.route.params.subscribe(res => {
      this.getDetails(res.id);
      this.idCategory = res.id;
    })
  }

  public getDetails(id: number): void {
    this.subsCategory = this.categoriesSvc.getOne(id).subscribe(res => {
      this.item = res;
      this.imagePath = environment.baseUrl + environment.assets + res.urlImg;
    })
  }

  ngOnDestroy() {
    this.subsCategory.unsubscribe();
    this.subsParams.unsubscribe();
  }

}
