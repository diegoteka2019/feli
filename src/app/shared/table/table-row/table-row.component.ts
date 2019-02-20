import { Component, OnInit, EventEmitter, Output, HostListener, ElementRef, ViewChild } from '@angular/core';


@Component({
    selector: 'app-table-row',
    templateUrl: './table-row.component.html',
    styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent {

    @HostListener('document:onDelete', ['$event'])
    clickout(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            if (event.target.classList.contains('delete'))
                this.showDialog = false;
        }
    }

    @Output() edit: EventEmitter<void> = new EventEmitter<void>();
    @Output() delete: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('delete') deleteButton: ElementRef;

    public showDialog: boolean = false;

    constructor(private eRef: ElementRef) {
    }

    public deleteDialog(event): void {
        event.stopPropagation();
        this.showDialog = true;
        this.deleteButton.nativeElement.dispatchEvent(new Event('onDelete', { bubbles: true }));
    }

    public onDelete(): void {
        this.delete.emit()
    }

    public onEdit(event): void {
        event.stopPropagation();
        this.edit.emit(event)
    }

    public cancel(): void {
        this.showDialog = false;
    }

}
