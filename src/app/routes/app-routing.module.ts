import { MainComponent, LoginComponent } from '@app/pages';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@app/core/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    
    children: [
      { path: '', loadChildren: '../pages/application/application.module#ApplicationModule', canActivate:[AuthGuardService]},
      { path: 'login', component: LoginComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
