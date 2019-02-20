import { Branch } from './../../models/branches/branch.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BranchesService extends HttpService  {

  api_controller: string = "api/v1/backoffice/marcas";

  private _lasttData:BehaviorSubject<Branch[]> = new BehaviorSubject<Branch[]>(null);

  public lastData$: Observable<Branch[]> = this._lasttData.asObservable();

  public getBranches() : Observable<Branch[]> {    
    return this.get<Branch[]>(this.api_controller)
      .pipe(tap((data) => {this._lasttData.next(data)}));
  }

  public getBranch(id: number) : Observable<Branch> {    
    return this.get<Branch>(this.api_controller + "/" + id);
  }

  public insertBranch(branch: FormData) : Observable<boolean> {
    return this.post<boolean>(this.api_controller, branch);
  }

  public updateBranch(branch: FormData) : Observable<boolean> {
    return this.put<boolean>(this.api_controller, branch);
  }

  public deleteBranch(branchID: number) : Observable<void> {
    return this.delete<void>(this.api_controller + "/" + branchID);
  }

  public updateData(): void {
    this.getBranches().subscribe();
  }
}
