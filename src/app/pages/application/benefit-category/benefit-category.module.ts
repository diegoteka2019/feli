import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitCategoryComponent } from './benefit-category.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { AddBenefitCategoryComponent } from './add-benefit-category/add-benefit-category.component';
import { EditBenefitCategoryComponent } from './edit-benefit-category/edit-benefit-category.component';
import { DetailsBenefitCategoryComponent } from './details-benefit-category/details-benefit-category.component';

const routes: Routes = [
  {
    path: '',
    component: BenefitCategoryComponent,
    children: [
      {path: 'details/:id', component: DetailsBenefitCategoryComponent},
      {path: 'edit/:id', component: EditBenefitCategoryComponent},
      {path: 'add', component: AddBenefitCategoryComponent}
    ]
  }
]

@NgModule({
  declarations: [
    BenefitCategoryComponent,
    AddBenefitCategoryComponent,
    EditBenefitCategoryComponent,
    DetailsBenefitCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class BenefitCategoryModule { }
