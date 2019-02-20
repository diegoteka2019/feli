import { NavigationService } from './../../core/services/navigation/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @Input() public showEditButton: boolean;
  @Input() public showDeleteButton: boolean;
  @Input() public showCloseDialog: boolean;

  @Output() public onDelete: EventEmitter<void> = new EventEmitter<any>();
  @Output() public onEdit: EventEmitter<void> = new EventEmitter<any>();

  public showClose: boolean;
  public showDelete: boolean;
  public showEdit: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private nav: NavigationService) {
    this.showDeleteButton = true;
    this.showEditButton = true;
  }

  ngOnInit() {
  }

  // Close action
  public close(): void {
    if (this.showCloseDialog)
      this.showClose = true;
    else
      this.confirmClose();
  }
  public cancelClose(): void {
    this.showClose = false;
  }
  public confirmClose(): void {
    this.showClose = false;
    this.nav.goto('./', this.route.parent)
  }


  // Delete action
  public delete(): void {
    this.showDelete = true;
  }
  public cancelDelete(): void {
    this.showDelete = false;
  }
  public confirmDelete(): void {
    this.showDelete = false;
    this.onDelete.emit();
  }


  // Edit action
  public edit(): void {
    this.onEdit.emit();
  }

}
