import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  constructor() { }

  /**
   * Return true if both have the same day, month and year
   * @param date1 Moment  
   * @param date2 Moment
   */
  public equals(date1: moment.Moment, date2: moment.Moment): boolean {
    let ret = true;
    ret = ret && date1.format('D') === date2.format('D');
    ret = ret && date1.format('M') === date2.format('M');
    ret = ret && date1.format('YYYY') === date2.format('YYYY');
    return ret;
  }

  /**
   * Return the difference in days between both
   * @param date1 
   * @param date2 
   */
  public compare(date1: moment.Moment, date2: moment.Moment): number {
    date1 = moment(date1);
    date2 = moment(date2);
    return date1.diff(date2, 'days');
  }
}
