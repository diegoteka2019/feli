import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ColorUtilsService {

  constructor() { }

  public  isValidColor(color: string): boolean {
    var re = /[0-9A-Fa-f]{6}/g;
    return re.test(color);
  }

  
}
