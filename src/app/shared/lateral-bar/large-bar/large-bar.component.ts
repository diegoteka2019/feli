import { Component, OnInit } from '@angular/core';
import { AbstractLateralBar } from '@app/shared/lateral-bar/abstract-lateral-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-large-bar',
  templateUrl: './large-bar.component.html',
  styleUrls: ['./large-bar.component.scss']
})
export class LargeBarComponent extends AbstractLateralBar implements OnInit {


  constructor(protected router: Router, protected route: ActivatedRoute) {
    super(router, route);
  }

  ngOnInit() {
  }


}
