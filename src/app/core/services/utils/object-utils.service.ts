import { Injectable } from '@angular/core';
import * as deepEqual from "deep-equal";

@Injectable({
  providedIn: 'root'
})
export class ObjectUtilsService {

  constructor() { }
  
  public equals<T>(object1: T, object2: T): boolean {
    return deepEqual(object1, object2);
  }

  public  clone<T>(object: Object): T {
    let ret:T;
    ret = JSON.parse(JSON.stringify(object));
    return ret;
  }

}
