import { AbstractABM } from '@app/core/architecture/components/abstract-abm';
import { NavigationService } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Subscriber } from 'rxjs';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '@app/models/categories/category.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent extends AbstractABM<Category, CategoriesService> implements OnInit {

  public categoryGroup: FormGroup;
  private subsParams: Subscription = new Subscriber();
  private subsCategory: Subscription = new Subscriber();

  public idCategory: number;
  public imagePath: string;

  constructor(private fb: FormBuilder, public categoriesSvc: CategoriesService, public route: ActivatedRoute, public nav: NavigationService) {
    super(categoriesSvc, nav, route)

    this.categoryGroup = this.fb.group({
      titulo: [null, [Validators.required]],      
      imagen: [null],
      id: [null],
      urlImg: [null]
    });


  }

  ngOnInit() {
    this.subsParams = this.route.params.subscribe(res => {
      this.getDetails(res.id);
      this.idCategory = res.id;
    });
  }

  ngOnDestroy() {
    this.subsParams.unsubscribe();
    this.subsCategory.unsubscribe();
  }

  public getDetails(id: number): void {
    this.subsCategory = this.categoriesSvc.getOne(id).subscribe(res => {      
      this.categoryGroup.setValue(res)
      this.imagePath = environment.baseUrl + environment.assets + res.urlImg;
    })
  }

  public setImage(image: string | ArrayBuffer | null): void {
      this.categoryGroup.get('imagen').setValue(image);
  }

  public updateCategory(category: Category): void {
    let temp_category = Category.clone(category);
    this.subsCategory = this.categoriesSvc.editItem(temp_category).subscribe(() => {
      this.listAll().then(() => {
        this.nav.goto('./', this.route.parent)
      })
    });
  }

}
