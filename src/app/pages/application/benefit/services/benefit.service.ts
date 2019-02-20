import { Injectable } from '@angular/core';
import { AbstractCrud } from '@app/core/architecture/components/abstract-crud';
import { HttpService } from '@app/core';
import { Benefit } from '@app/models/benefit-category/benefit';
import { Observable, from, of } from 'rxjs';
import { BenefitCategory } from '@app/models/benefit-category/benefit-category';

@Injectable({
  providedIn: 'root'
})
export class BenefitService extends AbstractCrud<Benefit> {

  constructor(protected http: HttpService) {
    super(http)
  }

  public getEndPoint(): string {
    return "api/v1/backoffice/beneficios/";
  }

}
