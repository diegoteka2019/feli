import { Column } from './../../../models/table/table.model';
import { Branch } from './../../../models/branches/branch.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchesService } from '@app/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  public branches: Array<Branch>;
  public cols: Array<Column>;
  constructor(private router: Router, private route: ActivatedRoute, private branchesSvc: BranchesService) {
    this.cols = [
      { title: 'Título', orderBy: 'titulo' },
      { title: 'Imagen', orderBy: null }
    ]
  }

  ngOnInit() {    
    this.loadBranches();
  }

  private loadBranches(): void {        
    this.branchesSvc.lastData$.subscribe((data) => {
      if(!data) {
        this.branchesSvc.updateData();
      } else {
        this.branches = data;
      }      
    });    
  }

  public newBranch(): void {
    this.router.navigate(['/marcas']).then(() => {
      this.router.navigate(['manage', 'new'], { relativeTo: this.route });
    })
  }

  public editBranch(branch: Branch): void {
    event.cancelBubble = true;
    this.router.navigate(['manage', branch.id], { relativeTo: this.route })
  }

  public deleteBranch(branch: Branch): void {
    event.cancelBubble = true;

    this.branchesSvc.deleteBranch(branch.id).subscribe(result => {
      this.branchesSvc.updateData();
    });
  }

  public viewBranch(branch: Branch): void {
    this.router.navigate(['manage', branch.id], { queryParams: { mode: 'readonly' }, relativeTo: this.route })
  }

  public getFullImageUrl(imageUrl: string): string {
    if (imageUrl) {
      return environment.baseUrl + environment.assets + imageUrl;
    }
    return "";
  }
}
