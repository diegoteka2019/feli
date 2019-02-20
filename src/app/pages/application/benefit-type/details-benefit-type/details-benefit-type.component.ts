import { Component, OnInit } from '@angular/core';
import { BenefitType } from '@app/models/benefit-category/benefit-type';
import { NavigationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { BenefitTypeService } from '../services/benefit-type.service';

@Component({
  selector: 'app-details-benefit-type',
  templateUrl: './details-benefit-type.component.html',
  styleUrls: ['./details-benefit-type.component.scss']
})
export class DetailsBenefitTypeComponent implements OnInit {

  public benefitType: BenefitType;

  constructor(private nav: NavigationService,private route: ActivatedRoute, private bcService: BenefitTypeService) {
    this.route.params.subscribe(res => {
      this.bcService.findBenefitType(res.id).subscribe(type => {
        this.benefitType = type;
      });
    });
   }

  ngOnInit() {
  }

  public edit(): void {
    this.nav.goto("edit", this.route.parent, this.benefitType.id);
  }
  
  public delete(id: number, event: MouseEvent): void {
    if(event) event.stopPropagation();
    this.bcService.deleteBenefitType(id).subscribe(res => {
      this.bcService.refreshBenefitTypes();
      this.nav.goto("./", this.route.parent);
    })

  }

}
