import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';

import { CategoriesComponent } from '@app/pages/application';
import { AddCategoryComponent } from './add-category/add-category.component';
import { DetailsCategoryComponent } from './details-category/details-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      {path: 'add', component: AddCategoryComponent},
      {path: 'edit/:id', component: EditCategoryComponent},
      {path: 'details/:id', component: DetailsCategoryComponent},
    ]
  }
]

@NgModule({
  declarations: [
    CategoriesComponent,
    AddCategoryComponent,
    DetailsCategoryComponent,
    EditCategoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoriesModule { }
