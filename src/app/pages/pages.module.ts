import { SharedModule } from '@app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, MainComponent } from '@app/pages';
import { AppRoutingModule } from './../routes/app-routing.module';
import { CoreModule } from '@app/core';

@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,    
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
  ]
})
export class PagesModule { }
