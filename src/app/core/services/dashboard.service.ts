import { User } from './../../models/users/user.model';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends HttpService  {

  api_controller: string = "api/dashboard";

  public getMonthlyReport() : Observable<any> {    

    return of( [
      {
        name: "Ene",
        value: 3200
      },
      {
        name: "Feb",
        value: 3050
      },
      {
        name: "Mar",
        value: 3250
      },
      {
        name: "Abr",
        value: 2950
      },
      {
        name: "May",
        value: 4000
      },
      {
        name: "Jun",
        value: 4200
      },
      {
        name: "Jul",
        value: 4020
      },
      {
        name: "Ago",
        value: 3584
      },
      {
        name: "Sep",
        value: 3880
      },
      {
        name: "Oct",
        value: 4028
      },
      {
        name: "Nov",
        value: 4157
      },
      {
        name: "Dic",
        value: 4286
      }
    ]);

    return this.get<any>(this.api_controller);
  }

  public getTotalReport() : Observable<any> {

    return of( 
      {
        totalBeneficios: 5000,
        beneficiosCanjeados: 4300
      }
    );

    return this.get<any>(this.api_controller);
  }

  public getTotalUsers() : Observable<any> {

    return of({
      totalUsers: 3257
    });

    return this.get<any>(this.api_controller);
  }

  public getTotalLikes() : Observable<any> {
    return of({
      totalLikes: 7543
    });
    return this.get<any>(this.api_controller);
  }
}
