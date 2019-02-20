import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AutoCompleteData } from '@app/models/shared/auto-complete';
import { startWith, map } from 'rxjs/operators';
import { CollectionUtilsService } from '@app/core/services/utils/collection-utils.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  providers: [CollectionUtilsService]
})
export class AutoCompleteComponent implements OnInit {

  @Input() public outerGroup: FormGroup;
  @Input() public autocompleteData: AutoCompleteData[];
  @Input() public required: boolean = false;
  @Input() public placeholder: string;
  @Input() public fcName: string;

  public filteredData: Observable<AutoCompleteData[]>;

  constructor(private collectionUtils: CollectionUtilsService) {
  }
  
  ngOnInit() {
    this.filteredData = this.outerGroup.get(this.fcName).
      valueChanges.pipe(startWith(''),
        map(value => this.filterData(value)));
  }

  public filterData(value: string): AutoCompleteData[] {
    let filterValue = value ? value.toString().toLowerCase() : "";
    let ret: AutoCompleteData[] = [];
    if(this.autocompleteData){
      ret = this.autocompleteData.filter(l => l.displayValue.toLowerCase().includes(filterValue));
    }
    return ret.sort( (l1, l2) => this.collectionUtils.compareString(l1.displayValue, l2.displayValue));
  }

  public displayFn(id: number): string {
    let ret = this.autocompleteData.find(option => option.id === id);
    return ret ? ret.displayValue : "";
  }

  public isAllLoaded(): boolean {
    let ret = this.outerGroup && this.fcName && !!this.autocompleteData;
    return ret;
  }

  public validateSelection(): void {
    let value = this.outerGroup.get(this.fcName).value;

    if(this.isNotValidSelecction(value)) {
      this.outerGroup.get(this.fcName).setErrors({notSelected:true})
    } else {
      this.outerGroup.get(this.fcName).setErrors(null)
    }
  }

  private isNotValidSelecction(input: string | number): boolean {
    return !this.autocompleteData.find(data => data.id === input);
  }


}
