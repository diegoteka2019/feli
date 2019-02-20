import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, ObservableInput, empty } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '@app/core/auth/authentication.service';
import { LocalstorageService } from '@app/core/services/localstorage.service';
import { TOKEN_HEADER, TOKEN_PREFIX } from '@app/core/constants';

@Injectable()
export class InterceptorService implements HttpInterceptor {


constructor(private authService: AuthenticationService, private localStorageService: LocalstorageService) { }

 public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let handled = next.handle(request);
    let token = this.localStorageService.getItem(TOKEN_HEADER);

    if (token) {
      let headers = request.headers.set('Authorization', TOKEN_PREFIX+token);
      let req = request.clone({headers: headers})
      handled = next.handle(req);
    }
    
    return handled.pipe(tap(this.successCallback(), this.errorCallback()));
  }

  private successCallback(): () => void {
    return () => {};
  }

  private errorCallback(): (error) => void {
    return (error) =>  {
      if (error.status === 401) { 
        this.authService.logOut();
      }
    }
  }

}
