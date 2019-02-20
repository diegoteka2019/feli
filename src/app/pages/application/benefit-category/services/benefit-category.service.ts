import { Injectable } from '@angular/core';
import { HttpService } from '@app/core';
import { BenefitCategory } from '@app/models/benefit-category/benefit-category';
import { AbstractCrud } from '@app/core/architecture/components/abstract-crud';

@Injectable({
  providedIn: 'root'
})
export class BenefitCategoryService extends AbstractCrud<BenefitCategory> {

  constructor(protected http: HttpService) {
    super(http);
  }

  public getEndPoint(): string {
    return "api/v1/backoffice/categorias-beneficios/"
  }
  
}
