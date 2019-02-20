import { SharedModule } from '@app/shared';
import { Routes, RouterModule } from '@angular/router';
import { PlacesComponent } from './places.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlaceComponent } from './add-place/add-place.component';
import { DetailsPlaceComponent } from './details-place/details-place.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';

const routes: Routes = [
  {
    path: '',
    component: PlacesComponent,
    children: [
      {path: 'add', component: AddPlaceComponent},
      {path: 'edit/:id', component: EditPlaceComponent},
      {path: 'details/:id', component: DetailsPlaceComponent},
    ]
  }
]

@NgModule({
  declarations: [
    PlacesComponent,
    AddPlaceComponent,
    DetailsPlaceComponent,
    EditPlaceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PlacesModule { }
