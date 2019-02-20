import { BehaviorService } from '@app/core/services/behavior.service';
import { HttpService } from '@app/core/services/http-service.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Crudeable } from './abstract-crud-interface';

export abstract class AbstractCrud<T> extends BehaviorService<T[]> implements Crudeable<T> {

  constructor(protected http: HttpService) {
    super(null);
  }

  protected abstract getEndPoint(): string;

  public addItem(item: T): Observable<void> {
    return this.http.post(this.getEndPoint(), item);
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.getEndPoint());
  }

  public editItem(item: T): Observable<void> {
    return this.http.put(this.getEndPoint(), item);
  }

  public deleteItem(id: number): Observable<void> {
    return this.http.delete(this.getEndPoint() + id);
  }

  public getOne(id: number): Observable<T> {
    return this.http.get(this.getEndPoint() + id);
  }

  public refreshBehavior(): void {
    this.getAll().subscribe(res => this.next(res));
  }


}
