import { Injectable } from '@angular/core';

const TOKEN = "SMS_TOKEN";

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  public setItem(key: string, value: string){
    localStorage.setItem(key, value);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public getItem(key: string): string {
    return localStorage.getItem(key);
  }
}


