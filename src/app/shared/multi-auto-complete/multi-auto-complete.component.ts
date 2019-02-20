import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AutoCompleteData } from '@app/models/shared/auto-complete';
import { Observable } from 'rxjs';
import { CollectionUtilsService } from '@app/core/services/utils/collection-utils.service';
import { startWith, map } from 'rxjs/operators';

const FC_NAME = "input";

@Component({
  selector: 'multi-auto-complete',
  templateUrl: './multi-auto-complete.component.html',
  styleUrls: ['./multi-auto-complete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiAutoCompleteComponent implements OnInit {

  public inputGroup: FormGroup;

  // Metodo que devuelve un Id y Descripción. Está definido en el padre.
  @Input() public set autocompleteData(data: AutoCompleteData[]) {
    let jsonData = JSON.stringify(data);
    let jsonAutocompleteData = JSON.stringify(this._autocompletedData);
    if (jsonAutocompleteData !== jsonData) {
      this._autocompletedData = data;
      this.inputGroup.get(FC_NAME).setValue(null);
    }
  };
  public get autocompleteData() {
    return this._autocompletedData;
  }
  public _autocompletedData: AutoCompleteData[];

  // Lista con los valores de un FormArray
  @Input() public set selectedData(data: Array<any>) {
    let jsonData = JSON.stringify(data);
    let jsonSelectedData = JSON.stringify(this._selectedData);
    if (jsonSelectedData !== jsonData) {
      this._selectedData = data;
      this.inputGroup.get(FC_NAME).setValue(null);
    }
  };
  public get selectedData() {
    return this._selectedData;
  }
  public _selectedData: Array<any> = [];

  @Input() public required: boolean = false; // Si es obligatorio

  @Output('change') public onChange: EventEmitter<Array<any>> = new EventEmitter(); // Emite una lista con los id selecionados

  public filteredData: Observable<AutoCompleteData[]>;
  @ViewChild('input') public input: ElementRef;

  constructor(private collectionUtils: CollectionUtilsService, protected fb: FormBuilder) {
    this.inputGroup = this.fb.group({
      input: [null],
    });
  }

  ngOnInit() {
    this.filteredData = this.inputGroup.get(FC_NAME).
      valueChanges.pipe(
        startWith(''),
        map(value => this.filterData(value)));
  }

  public filterData(value: string): AutoCompleteData[] {
    let filterValue = value ? value.toString().toLowerCase() : "";
    let ret: AutoCompleteData[] = [];
    if (this.autocompleteData) {
      let notSelectedData = this.autocompleteData.filter(data => !this.selectedData.find(element => element.id === data.id))
      ret = notSelectedData.filter(l => l.displayValue.toLowerCase().includes(filterValue));
    }
    return ret.sort((l1, l2) => this.collectionUtils.compareString(l1.displayValue, l2.displayValue));
  }

  public displayFn(id: number): string {
    let ret = this.autocompleteData.find(option => option.id === id);
    return ret ? ret.displayValue : "";
  }

  public isAllLoaded(): boolean {
    let ret = this.inputGroup && FC_NAME && !!this.autocompleteData;
    return ret;
  }

  public add(): void {
    let value = this.inputGroup.get(FC_NAME).value;
    if (this.isNotValidSelecction(value) || this.isRepeted(value)) {
      //TODO
      // alert("seleccione una categoria valida")
    } else {
      let data = this.autocompleteData.find(d => d.id === +value);
      this.selectedData.push(data);
      this.inputGroup.controls[FC_NAME].setValue('');
      this.input.nativeElement.blur();
      this.autocompleteData = [];
      this.onChange.emit(this.selectedData.map(el => { return { id: el.id } }))
    }
  }

  public deleteTag(id: number): void {
    this.selectedData = this.selectedData.filter(data => data.id !== id);
    this.onChange.emit(this.selectedData.map(el => { return { id: el.id } }))
    this.inputGroup.controls[FC_NAME].setValue('');
  }

  private isRepeted(value: number): boolean {
    let ret = this.selectedData.filter(data => data.id === value).length > 0;
    return ret;
  }

  //TODO
  public validateSelection(): void {
    // let value = this.inputGroup.get(FC_NAME).value;

    // if(this.isNotValidSelecction(value)) {
    //   this.inputGroup.get(FC_NAME).setErrors({notSelected:true})
    // } else {
    //   this.inputGroup.get(FC_NAME).setErrors(null)
    // }
  }

  private isNotValidSelecction(input: string | number): boolean {
    return !this.autocompleteData.find(data => data.id === input);
  }
}
