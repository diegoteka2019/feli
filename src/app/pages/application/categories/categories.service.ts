import { HttpService } from '@app/core';
import { Injectable } from '@angular/core';
import { Category } from '@app/models/categories/category.model';
import { AbstractCrud } from '@app/core/architecture/components/abstract-crud';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends AbstractCrud<Category> {

  constructor(protected http: HttpService) {
    super(http)
  }

  public getEndPoint(): string{
    return 'api/v1/backoffice/categorias-productos-samsung/';
  }

}