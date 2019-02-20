import { Component, OnInit } from '@angular/core';
import { AbstractLateralBar } from '@app/shared/lateral-bar/abstract-lateral-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-small-bar',
  templateUrl: './small-bar.component.html',
  styleUrls: ['./small-bar.component.scss']
})
export class SmallBarComponent extends AbstractLateralBar implements OnInit {

  constructor(protected router: Router, protected route: ActivatedRoute) {
    super(router, route);
   }

  ngOnInit() {
  }


}
