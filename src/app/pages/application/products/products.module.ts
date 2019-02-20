import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from '@app/pages/application';
import { DetailsProductComponent } from './details-product/details-product.component';
import { SharedModule } from '@app/shared';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {path: 'details/:id', component: DetailsProductComponent},
      {path: 'edit/:id', component: EditProductComponent},
      {path: 'add', component: AddProductComponent}
    ]
  }
]
@NgModule({
  declarations: [
    ProductsComponent,
    DetailsProductComponent,
    AddProductComponent,
    EditProductComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
