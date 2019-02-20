import { BehaviorSubject, Observable } from 'rxjs';

export abstract class BehaviorService<T> {

  private subject: BehaviorSubject<T>;

  public constructor(private initialData: T) {
    this.subject = new BehaviorSubject(initialData);
  }

  public next(data: T): void {
    this.subject.next(data);
  }

  public getAsObservable(): Observable<T> {
    return this.subject.asObservable();
  }

  public getValue(): T {
    return this.subject.getValue();
  }


}
