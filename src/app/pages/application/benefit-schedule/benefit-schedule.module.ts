import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { BenefitScheduleComponent } from './benefit-schedule.component';
import { AddBenefitScheduleComponent } from './add-benefit-schedule/add-benefit-schedule.component';
import { DetailsScheduleComponent } from './details-schedule/details-schedule.component';
import { EditBenefitScheduleComponent } from './add-benefit-schedule/edit-benefit-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: BenefitScheduleComponent,
    children: [
      {path: 'add', component: AddBenefitScheduleComponent},
      {path: 'edit/:id', component: EditBenefitScheduleComponent},
      {path: 'details/:id', component: DetailsScheduleComponent},
    ]
  }
]

@NgModule({
  declarations: [
    BenefitScheduleComponent,
    AddBenefitScheduleComponent,
    DetailsScheduleComponent,
    EditBenefitScheduleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class BenefitScheduleModule { }
