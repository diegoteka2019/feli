import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollectionUtilsService {

  constructor() { }

  /**
   * Comparator para utilizar en el sort
   * @param s1 
   * @param s2 
   * @param isAsc Tipo de orden, por defecto ascendente
   */
  public compareString(s1: string, s2: string, isAsc: boolean = true): number {
    let param1Lc = s1 != null ? s1.toLowerCase() : "";
    let param2Lc = s2 != null ? s2.toLowerCase() : "";
    if (param2Lc.length == 0 && param1Lc.length == 0) {
      return 0;
    } else if (param2Lc.length == 0) {
      return -1;
    } else if (param1Lc.length == 0) {
      return 1;
    }
    return (param1Lc < param2Lc ? -1 : 1) * (isAsc ? 1 : -1);
}

}
