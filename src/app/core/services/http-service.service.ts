import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DEFAULT_HEADERS } from '@app/core/constants';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(environment.baseUrl + url, {headers: DEFAULT_HEADERS})
  }
  
  public post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(environment.baseUrl + url, JSON.stringify(body), {headers: DEFAULT_HEADERS});
  }
  
  public put<T>(url: string, body: any): Observable<T> {    
    return this.httpClient.put<T>(environment.baseUrl + url, JSON.stringify(body), {headers: DEFAULT_HEADERS});
  }

  public delete<T>(url: string,): Observable<T> {
    return this.httpClient.delete<T>(environment.baseUrl + url, {headers: DEFAULT_HEADERS});
  }


}
