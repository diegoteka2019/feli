import { TestBed } from '@angular/core/testing';

import { DateUtilsService } from './date-utils.service';
import * as moment from 'moment';

describe('DateUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('Compare Less', () => {
    const service: DateUtilsService = TestBed.get(DateUtilsService);
    let testSubject = service.compare(moment(), moment().add(2, "days"));
    expect(testSubject).toBeLessThan(0);
  });

  it('Compare Greater', () => {
    const service: DateUtilsService = TestBed.get(DateUtilsService);
    let testSubject = service.compare(moment(), moment().subtract(2, "days"));
    expect(testSubject).toBeGreaterThan(0);
  });

  it('Compare Equals', () => {
    const service: DateUtilsService = TestBed.get(DateUtilsService);
    let testSubject = service.compare(moment(), moment());
    expect(testSubject).toEqual(0);
  });

  it('Compare Equals adding minutes', () => {
    const service: DateUtilsService = TestBed.get(DateUtilsService);
    let testSubject = service.compare(moment(), moment().add(1, "minutes"));
    expect(testSubject).toEqual(0);
  });


});
