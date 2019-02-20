import { Column } from '@app/models/table/table.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit {

  @Input() public set cols(columns: Column[]) {
    if (columns) {
      this._cols = columns.filter(col => col.orderBy !== null)
    }
  };
  public _cols: Array<Column>
  public searchBox: string = '';
  public selection: string = '';

  constructor() { }

  ngOnInit() {
  }

  public selectionChange(event): void {
    this.selection = event
  }

}
