import { Component, OnInit } from '@angular/core';
import { BenefitCategory } from '@app/models/benefit-category/benefit-category';
import { ActivatedRoute } from '@angular/router';
import { BenefitCategoryService } from '../services/benefit-category.service';
import { NavigationService } from '@app/core';

@Component({
  selector: 'app-details-benefit-category',
  templateUrl: './details-benefit-category.component.html',
  styleUrls: ['./details-benefit-category.component.scss']
})
export class DetailsBenefitCategoryComponent implements OnInit {

  public benefitCategory: BenefitCategory;

  constructor(private nav: NavigationService,private route: ActivatedRoute, private bcService: BenefitCategoryService) {
    this.route.params.subscribe(res => {
      this.bcService.getOne(res.id).subscribe(category => {
        this.benefitCategory = category;
      });
    });
   }

  ngOnInit() {
  }

  public edit(): void {
    this.nav.goto("edit", this.route.parent, this.benefitCategory.id);
  }
  
  public delete(id: number, event: MouseEvent): void {
    if(event) event.stopPropagation();
    this.bcService.deleteItem(id).subscribe(res => {
      this.refresh();
      this.nav.goto("./", this.route.parent);
    })

  }

  private refresh(): void {
    this.bcService.getAll().subscribe(res => this.bcService.next(res))
  }

}
