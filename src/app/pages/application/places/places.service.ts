import { AbstractCrud } from '@app/core/architecture/components/abstract-crud';
import { HttpService } from '@app/core/services/http-service.service';
import { Place, BranchPlace } from '@app/models/places/place.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { httpFactory } from '@angular/http/src/http_module';

@Injectable({
  providedIn: 'root'
})
export class PlacesService extends AbstractCrud<Place>{

  constructor(protected http: HttpService) {
    super(http)
  }

  public getEndPoint(): string {
    return 'api/v1/backoffice/locales/';
  }

  public getAllDepartments(): Observable<any> {
    return this.http.get('api/v1/backoffice/departamentos/');
  }

  public getOneDepartment(id: number): Observable<any> {
    return this.http.get('api/v1/backoffice/departamentos/' + id);
  }

  public getByBranch(id: number): Observable<BranchPlace[]>{
    return this.http.get('api/v1/backoffice/locales/porMarca/' + id);
  }

}
