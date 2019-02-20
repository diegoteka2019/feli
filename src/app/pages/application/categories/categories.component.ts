import { environment } from './../../../../environments/environment';
import { Category } from '@app/models/categories/category.model';
import { NavigationService } from '@app/core';
import { Subscription, Subscriber } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Column } from '@app/models/table/table.model';
import { AbstractABM } from '@app/core/architecture/components/abstract-abm';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [NavigationService]
})
export class CategoriesComponent extends AbstractABM<Category, CategoriesService> implements OnInit, OnDestroy {

  public cols: Array<Column>;
  private subsCategories: Subscription = new Subscriber();

  constructor(public router: Router, public route: ActivatedRoute, public categoriesSvc: CategoriesService, public nav: NavigationService) {
    super(categoriesSvc, nav, route)
    this.cols = [
      {
        title: 'Título',
        orderBy: 'titulo'
      },
      {
        title: 'Imagen',
        orderBy: null
      }
    ]
  }

  ngOnInit() {
    this.listAll().then(() => {
      this.getCategories();
    });
  }

  public getCategories() {
    this.subsCategories = this.categoriesSvc.getAsObservable().subscribe(() => {
      this.listItems = this.categoriesSvc.getValue();
    })
  }

  public addCategory(): void {
    this.nav.goto('add');
  }

  public seeDetails(id: number): void {
    this.nav.goto('details', this.route, id);
  }

  public getFullImageUrl(imageUrl: string): string {
    if (imageUrl) {
      return environment.baseUrl + environment.assets + imageUrl;
    }
    return "";
  }

  ngOnDestroy() {
    this.subsCategories.unsubscribe();
  }

}
