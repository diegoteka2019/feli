import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { RouterModule, Routes } from '@angular/router';
import { BenefitTypeComponent } from './benefit-type.component';
import { DetailsBenefitTypeComponent } from './details-benefit-type/details-benefit-type.component';
import { EditBenefitTypeComponent } from './edit-benefit-type/edit-benefit-type.component';
import { AddBenefitTypeComponent } from './add-benefit-type/add-benefit-type.component';

const routes: Routes = [
  {
    path: '',
    component: BenefitTypeComponent,
    children: [
      {path: 'details/:id', component: DetailsBenefitTypeComponent},
      {path: 'edit/:id', component: EditBenefitTypeComponent},
      {path: 'add', component: AddBenefitTypeComponent}
    ]
  }
]

@NgModule({
  declarations: [
    BenefitTypeComponent,
    DetailsBenefitTypeComponent,
    EditBenefitTypeComponent,
    AddBenefitTypeComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class BenefitTypeModule { }
