import { Observable } from "rxjs";

export interface Crudeable<T> {

    addItem(item: T): Observable<void>;
    editItem(item: T): Observable<void>;
    deleteItem(id: number): Observable<void>;
    getOne(id: number): Observable<T>;
    getAll(): Observable<T[]>;
    next(t: T[]): void;
    refreshBehavior(): void;
    getAsObservable(): Observable<T[]>;

}