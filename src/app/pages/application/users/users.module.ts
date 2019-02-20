import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [      
      {path: 'manage/:id', component: ManageUserComponent }      
    ]
  }
]

@NgModule({
  declarations: [ManageUserComponent, UsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
