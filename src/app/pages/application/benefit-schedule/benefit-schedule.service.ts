import { Observable, of } from 'rxjs';
import { HttpService } from '@app/core/services/http-service.service';
import { AbstractCrud } from '@app/core/architecture/components/abstract-crud';
import { Injectable } from '@angular/core';
import { BenefitSchedule } from '@app/models/benefit-category/benefit-schedule.model';

@Injectable({
  providedIn: 'root'
})
export class BenefitScheduleService extends AbstractCrud<BenefitSchedule> {


  constructor(protected http: HttpService) {
    super(http);
  }

  public getEndPoint(): string {
    return "api/v1/backoffice/agendas-beneficios/";
  }
}
