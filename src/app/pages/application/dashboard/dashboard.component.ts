import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@app/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalReportSize: any[] = [100, 100];
  monthlyReportSize: any[] = [700, 400];

  monthlyResults: any;
  totalResults: any;
  totalUsersResult: any;
  totalLikesResult: any;

  totalColorScheme = {
    domain: ['#1428A0', '#373737']
  };

  monthlyColorScheme = {
    domain: ['#1428A0']
  };

  constructor(private dashboardSvc: DashboardService) { }

  ngOnInit() {

    this.dashboardSvc.getMonthlyReport().subscribe((data) => {
      this.monthlyResults = data;
    });

    this.dashboardSvc.getTotalReport().subscribe((data) => {
      this.totalResults = [
        {
          name: "Beneficios Canjeados",
          value: data.beneficiosCanjeados,
          percent: (data.beneficiosCanjeados / data.totalBeneficios * 100)
        },
        {
          name: "Beneficios Disponibles",
          value: data.totalBeneficios - data.beneficiosCanjeados
        }
      ];      
    });
  
    this.dashboardSvc.getTotalUsers().subscribe((data) => {
      this.totalUsersResult = 0;

      let interval: number = data.totalUsers / 20;
      let intTimer = setInterval(() => {
        this.totalUsersResult += interval;
        if(this.totalUsersResult > data.totalUsers) {
          this.totalUsersResult = data.totalUsers;
          clearInterval(intTimer);
        }
      }, 100);

    });

    this.dashboardSvc.getTotalLikes().subscribe((data) => {
      this.totalLikesResult = 0;

      let interval: number = data.totalLikes / 20;

      let intTimer = setInterval(() => {
        this.totalLikesResult += interval;
        if(this.totalLikesResult > data.totalLikes) {
          this.totalLikesResult = data.totalLikes;
          clearInterval(intTimer);
        }
      }, 100);
    });
  }
}
