import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { Category } from '@app/models/categories/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subscriber } from 'rxjs';
import { NavigationService } from '@app/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  public categoryGroup: FormGroup;
  
  private subsCategory: Subscription = new Subscriber();
  private subsListCategory: Subscription = new Subscriber();

  constructor(private fb: FormBuilder, private categoriesSvc: CategoriesService,
    private route: ActivatedRoute, private nav: NavigationService) {
    this.categoryGroup = this.fb.group({
      titulo: [null, [Validators.required]],      
      imagen: [null, [Validators.required]]
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subsCategory.unsubscribe();
    this.subsListCategory.unsubscribe();
  }

  public setImage(image: string | ArrayBuffer | null): void {
    this.categoryGroup.get('imagen').setValue(image);
  }

  public addCategory(category: Category): void {
    let temp_category = Category.clone(category);
    this.subsCategory = this.categoriesSvc.addItem(temp_category).subscribe(() => {
      this.updateList();
    });
  }
  
  public updateList(): void {
    this.subsListCategory = this.categoriesSvc.getAll().subscribe(res => {
      this.categoriesSvc.next(res);
      this.close();
    });
  }

  public close(): void{
    this.nav.goto('./', this.route.parent)
  }

}
