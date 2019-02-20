import { AuthenticationService } from './../../core/auth/authentication.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() public pageName: string;
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  public logout() {
    this.auth.logOut();
  }

}
