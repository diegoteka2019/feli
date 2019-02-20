import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationComponent } from '@app/pages';
import { APP_PAGES } from '@app/constants/pages-constants';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    children: [
      {
        path: '',
        redirectTo: 'agenda-beneficios'
      },
      // {
      //   path: 'dashboard',
      //   loadChildren: '@app/pages/application/dashboard/dashboard.module#DashboardModule',
      //   data: APP_PAGES.DASHBOARD
      // },
      {
        path: 'productos',
        loadChildren: '@app/pages/application/products/products.module#ProductsModule',
        data: APP_PAGES.PRODUCTOS
      },
      {
        path: 'marcas',
        loadChildren: '@app/pages/application/branches/branches.module#BranchesModule',
        data: APP_PAGES.MARCAS
      },
      {
        path: 'categorias',
        loadChildren: '@app/pages/application/categories/categories.module#CategoriesModule',
        data: APP_PAGES.CATEGORIAS
      },
      {
        path: 'locales',
        loadChildren: '@app/pages/application/places/places.module#PlacesModule',
        data: APP_PAGES.LOCALES
      },
      {
        path: 'usuarios',
        loadChildren: '@app/pages/application/users/users.module#UsersModule',
        data: APP_PAGES.USUARIOS
      },
      {
        path: 'beneficios',
        loadChildren: '@app/pages/application/benefit/benefit.module#BenefitModule',
        data: APP_PAGES.BENEFICIOS
      },
      {
        path: 'categorias-beneficios',
        loadChildren: '@app/pages/application/benefit-category/benefit-category.module#BenefitCategoryModule',
        data: APP_PAGES.CATEGORIAS_BENEFICIOS
      },
      {
        path: 'tipos-beneficios',
        loadChildren: '@app/pages/application/benefit-type/benefit-type.module#BenefitTypeModule',
        data: APP_PAGES.TIPOS_BENEFICIOS
      },
      {
        path: 'agenda-beneficios', 
        loadChildren: '@app/pages/application/benefit-schedule/benefit-schedule.module#BenefitScheduleModule',
        data: APP_PAGES.AGENDA_BENEFICIOS
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
