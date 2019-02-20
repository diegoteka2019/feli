import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { ApplicationRoutingModule } from '@app/routes/application-routing.module';
import { ApplicationComponent } from '@app/pages';

@NgModule({
  declarations: [
    ApplicationComponent,
  ],
  imports: [
    CommonModule, 
    SharedModule,
    ApplicationRoutingModule,
  ]
})
export class ApplicationModule { }
