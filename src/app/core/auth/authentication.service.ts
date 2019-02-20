import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Login, LoginResponse } from '@app/models';
import { LocalstorageService } from '@app/core/services/localstorage.service';
import { HttpService } from '@app/core/services/http-service.service';
import { Observable } from 'rxjs';
import { TOKEN_HEADER } from '@app/core/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private http: HttpService, private localStorageService: LocalstorageService) { }


  public login(loginData: Login): Observable<LoginResponse> {
    let url = "api/authenticate";
    return this.http.post<LoginResponse>(url, loginData);
  }

  public saveToken(token: string): void {
    this.localStorageService.setItem(TOKEN_HEADER, token);
  }

  public getToken(): string {
    return this.localStorageService.getItem(TOKEN_HEADER);
  }

  public isLoggedIn(): boolean {
    let token = this.getToken();
    return !!token;
  }

  public logOut(): void {
    this.localStorageService.removeItem(TOKEN_HEADER);
    location.reload();
  }

}
