import { Injectable } from '@angular/core';
import { HttpService } from '@app/core';
import { Product } from '@app/models/product/product';
import { Observable } from 'rxjs';
import { AbstractCrud } from '@app/core/architecture/components/abstract-crud';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractCrud<Product> {

  constructor(protected http: HttpService) {
    super(http);
  }

  public getEndPoint(): string{
    return 'api/v1/backoffice/productos-samsung/';
  }


}
