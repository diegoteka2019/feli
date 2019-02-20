import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @HostListener('click', ['$event'])
  stop(event) {
    event.stopPropagation();
  }

  @Input() text: string;
  @Input() confirmText: string;
  @Input() cancelText: string;
  @Input() show: boolean = false;
  @Input() zeroTop: boolean = false;

  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  public onConfirm(event): void {
    event.stopPropagation();
    this.confirm.emit();
  }
  public onCancel(event): void {
    event.stopPropagation();
    this.cancel.emit();
  }

}
