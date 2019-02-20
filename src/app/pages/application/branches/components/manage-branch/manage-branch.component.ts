import { Subscription } from 'rxjs';
import { Branch } from '../../../../../models/branches/branch.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BranchesService } from '@app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ImageUploadComponent } from '@app/shared/image-upload/image-upload.component';

@Component({
  selector: 'app-manage-branch',
  templateUrl: './manage-branch.component.html',
  styleUrls: ['./manage-branch.component.scss']
})
export class ManageBranchComponent implements OnInit, OnDestroy {

  public branchGroup: FormGroup;
  public insertMode: boolean;
  public readonlyMode: boolean;
  private paramsSubs: Subscription;
  private queryParamsSubs: Subscription;
  private branchData: Branch;

  constructor(private fb: FormBuilder, private branchesSvc: BranchesService,
    private router: Router, private route: ActivatedRoute) { 

      this.branchGroup = this.fb.group({
        id: [null],
        titulo: [null, [Validators.required]],
        email: [null, [Validators.email]],
        telefono: [null],        
        subtitulo: [null],        
        urlWebsite: [null],        
        urlImg: [null],        
        imagen: [null]
      })

    }

  ngOnInit() {
    this.paramsSubs = this.route.params.subscribe(res => {      
      this.insertMode = res.id == "new";
      if(!this.insertMode) {
        this.branchesSvc.getBranch(res.id).subscribe((data) => {
          this.branchData = data;
          this.branchGroup.setValue(data);
        });
      } else {
        this.branchGroup.reset();   
        this.branchGroup.controls.email.setValue("");    
        this.branchGroup.controls.urlWebsite.setValue("");    
      }
    });

    this.queryParamsSubs = this.route.queryParams.subscribe( res => {
      this.readonlyMode = res.mode == "readonly";      
    });
  }

  public getFullImageUrl() : string {
    if(this.branchData != null && this.branchData.urlImg) {
      return environment.baseUrl + environment.assets + this.branchData.urlImg;
    }
    return "";    
  }

  ngOnDestroy(): void {
    this.paramsSubs.unsubscribe();
    this.queryParamsSubs.unsubscribe();
  }

  public setImage(image: string | ArrayBuffer | null): void {
    this.branchGroup.get('imagen').setValue(image);
  }

  public manageBranch(branch: FormData): void {
    if(this.insertMode) {
      this.branchesSvc.insertBranch(branch).subscribe((success) => {
        this.updateList();      
      });  
    } else {
      this.branchesSvc.updateBranch(branch).subscribe((success) => {
        this.updateList();      
      });
    }
  }

  public updateList(): void {
    this.branchesSvc.updateData();
    this.close();
  }

  public close() {
    this.router.navigate(['./'], { relativeTo: this.route.parent })
  }

  public edit() {
    this.router.navigate(['manage', this.branchData.id], { relativeTo: this.route.parent })    
  }

  public delete() {
    this.branchesSvc.deleteBranch(this.branchData.id).subscribe(result => {
      this.branchesSvc.updateData();
      this.close();
    });    
  }

}
