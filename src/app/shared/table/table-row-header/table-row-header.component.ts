import { Column } from '@app/models/table/table.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'table-row-header',
  templateUrl: './table-row-header.component.html',
  styleUrls: ['./table-row-header.component.scss']
})
export class TableRowHeaderComponent implements OnInit {

  @Input() public cols: Array<Column>;
  @Input() public set collection(collection: Array<any>) {
    this._collection = collection;
    if (collection && collection.length > 0)
      this.orderBy(this._collection, this.cols[0].orderBy);
  }


  public asc: boolean = true;
  public last: string = '';
  public _collection: Array<any>;

  constructor() {
    this._collection = [];
  }

  ngOnInit() {
  }

  public orderBy(collection: Array<any>, orderBy: string): void {
    let ordering = [];
    let ret;
    if (orderBy) {

      if (this.isOrdering(orderBy)) {
        this.asc = !this.asc;
      }
      else {
        this.asc = true;
      }

      if (this.asc) ret = 1;
      else ret = -1;

      ordering = collection.sort((a, b) => {
        if (!a[orderBy]) return 1;
        else if (!b[orderBy]) return -1;
        else{
          if (a[orderBy] > b[orderBy]) return ret;
          else if (a[orderBy] < b[orderBy]) return ret * (-1);
          else return 0;
        }

      });
      collection = ordering;
      this.last = orderBy;
    }
  }

  public isOrdering(order: string) {
    return order === this.last;
  }

}
