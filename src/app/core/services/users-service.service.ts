import { User } from './../../models/users/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends HttpService  {

  api_controller: string = "api/v1/backoffice/usuarios";

  private _lasttData:BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);

  public lastData$: Observable<User[]> = this._lasttData.asObservable();

  public getUsers() : Observable<User[]> {    
    return this.get<User[]>(this.api_controller + "?page=0&size=100")
      .pipe(tap((data) => {this._lasttData.next(data)}));
  }

  public getUser(login: string) : Observable<User> {    
    return this.get<User>(this.api_controller + "/" + login);
  }

  public insertUser(user: FormData) : Observable<boolean> {
    return this.post<boolean>(this.api_controller, user);
  }

  public updateUser(user: FormData) : Observable<boolean> {
    return this.put<boolean>(this.api_controller, user);
  }

  public deleteUser(login: string) : Observable<void> {
    return this.delete<void>(this.api_controller + "/" + login);
  }

  public updateData(): void {
    this.getUsers().subscribe();
  }
}
