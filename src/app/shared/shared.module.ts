import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LateralBarComponent } from './lateral-bar/lateral-bar.component';
import { LargeBarComponent } from './lateral-bar/large-bar/large-bar.component';
import { SmallBarComponent } from './lateral-bar/small-bar/small-bar.component';
import { HeaderComponent } from '@app/shared/header/header.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MAT_DATE_LOCALE } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { TableRowComponent } from './table/table-row/table-row.component';
import { SearchPipe } from '@app/pipes/search.pipe';
import { TableRowHeaderComponent } from './table/table-row-header/table-row-header.component';
import { FilterTableComponent } from './table/filter-table/filter-table.component';
import { InputColorDirective, InputStringDirective, InputNumberDirective } from '@app/directives/validation.directive';
import { FormInputComponent } from './form/form-input/form-input.component';
import { MultiAutoCompleteComponent } from './multi-auto-complete/multi-auto-complete.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SanitizeHtmlPipe } from '@app/pipes/html.pipe';

/* Importar y exportar modulos de terceros y componentes genericos */

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    AngularEditorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  declarations: [
    LateralBarComponent,
    LargeBarComponent,
    SmallBarComponent,
    HeaderComponent,
    ImageUploadComponent,
    SideBarComponent,
    DialogComponent,
    TableRowComponent,
    SearchPipe,
    SanitizeHtmlPipe,
    AutoCompleteComponent,
    TableRowHeaderComponent,
    FilterTableComponent,
    FormInputComponent,
    FilterTableComponent,
    InputColorDirective,
    InputStringDirective,
    InputNumberDirective,
    MultiAutoCompleteComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    LateralBarComponent,
    HeaderComponent,
    ImageUploadComponent,
    SideBarComponent,
    DialogComponent,
    TableRowComponent,
    SearchPipe,
    SanitizeHtmlPipe,
    AutoCompleteComponent,
    MatAutocompleteModule,
    TableRowHeaderComponent,
    MatSelectModule,
    FilterTableComponent,
    InputColorDirective,
    InputStringDirective,
    InputNumberDirective,
    FilterTableComponent,
    FormInputComponent,
    MultiAutoCompleteComponent,
    AngularEditorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
  ]
})
export class SharedModule { }
