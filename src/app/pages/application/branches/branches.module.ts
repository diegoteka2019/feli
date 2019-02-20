import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesComponent } from './branches.component';
import { Routes, RouterModule } from '@angular/router';
import { ManageBranchComponent } from './components/manage-branch/manage-branch.component';
import { SharedModule } from '@app/shared';

const routes: Routes = [
  {
    path: '',
    component: BranchesComponent,
    children: [      
      {path: 'manage/:id', component: ManageBranchComponent }      
    ]
  }
]

@NgModule({
  declarations: [ManageBranchComponent, BranchesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class BranchesModule { }
