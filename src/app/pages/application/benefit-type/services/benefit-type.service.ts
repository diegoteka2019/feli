import { Injectable } from '@angular/core';
import { BenefitType } from '@app/models/benefit-category/benefit-type';
import { BehaviorService } from '@app/core/services/behavior.service';
import { Observable } from 'rxjs';
import { HttpService } from '@app/core';

@Injectable({
  providedIn: 'root'
})
export class BenefitTypeService extends BehaviorService<BenefitType[]>{
  
  constructor(private httpService: HttpService) {
    super(null);
  }

  public createBenefitType(benefitType: BenefitType): Observable<void> {
    return this.httpService.post("api/v1/backoffice/tipos-beneficios", benefitType);
  }
  
   public deleteBenefitType(id: number): Observable<void> {
     return this.httpService.delete("api/v1/backoffice/tipos-beneficios/"+id);
  }

  public refreshBenefitTypes(): void {
      this.httpService.get<BenefitType[]>("api/v1/backoffice/tipos-beneficios").subscribe(res => this.next(res));
  }

  public updateBenefitType(benefitType: BenefitType): Observable<void> {
    return this.httpService.put("api/v1/backoffice/tipos-beneficios", benefitType);
  }

  public findBenefitType(id: number): Observable<BenefitType> {
    return this.httpService.get("api/v1/backoffice/tipos-beneficios/"+id)
  }


}
