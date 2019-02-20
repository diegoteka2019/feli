import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitComponent } from './benefit.component';
import { AddBenefitComponent } from './add-benefit/add-benefit.component';
import { EditBenefitComponent } from './edit-benefit/edit-benefit.component';
import { DetailsBenefitComponent } from './details-benefit/details-benefit.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';

const routes: Routes = [
  {
    path: '',
    component: BenefitComponent,
    children: [
      {path: 'details/:id', component: DetailsBenefitComponent},
      {path: 'edit/:id', component: EditBenefitComponent},
      {path: 'add', component: AddBenefitComponent}
    ]
  }
]

@NgModule({
  declarations: [BenefitComponent, AddBenefitComponent, EditBenefitComponent, DetailsBenefitComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class BenefitModule { }
