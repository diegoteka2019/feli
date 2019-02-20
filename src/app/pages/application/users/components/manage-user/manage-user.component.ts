import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '@app/models';
import { UsersService } from '@app/core';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit, OnDestroy {

  public userGroup: FormGroup;
  public insertMode: boolean;
  public readonlyMode: boolean;
  private paramsSubs: Subscription;
  private queryParamsSubs: Subscription;
  public userData: User;

  constructor(private fb: FormBuilder, private usersSvc: UsersService,
    private router: Router, private route: ActivatedRoute) { 

      this.userGroup = this.fb.group({
        id: [null],        
        activated: [null],        
        email: [null, [Validators.email]],
        login: [null, [Validators.required]],
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        langKey: [null],        
        mensajeBienvenida: [null],        
        origen: [null],        
        puedeIngresar: [null],        
        tituloBienvenida: [null],        
        imageUrl: [null],

        createdBy: [null],
        createdDate: [null],
        lastModifiedBy: [null],
        lastModifiedDate: [null],
      })

    }

  ngOnInit() {
    this.paramsSubs = this.route.params.subscribe(res => {      
      this.insertMode = res.id == "new";
      if(!this.insertMode) {
        this.usersSvc.getUser(res.id).subscribe((data) => {
          this.userData = data;
          this.userGroup.patchValue(data);
        });
      } else {
        this.userGroup.reset();        
      }
    });

    this.queryParamsSubs = this.route.queryParams.subscribe( res => {
      this.readonlyMode = res.mode == "readonly";      
    });
  }

  public getFullImageUrl() : string {    
    if(this.userData != null && this.userData.imageUrl) {
      return environment.baseUrl + environment.assets + this.userData.imageUrl;
    }
    return "";    
  }

  ngOnDestroy(): void {
    this.paramsSubs.unsubscribe();
    this.queryParamsSubs.unsubscribe();
  }

  public setImage(image: string | ArrayBuffer | null): void {
    this.userGroup.get('imageUrl').setValue(image);
  }

  public manageUser(): void {
    
    if(this.insertMode) {
      
      this.userGroup.get("createdBy").setValue("Pepe");
      this.userGroup.get("createdDate").setValue(new Date());

      this.usersSvc.insertUser(this.userGroup.value).subscribe((success) => {
        this.updateList();      
      });  
    } else {
      this.userGroup.get("lastModifiedBy").setValue("Pepe");
      this.userGroup.get("lastModifiedDate").setValue(new Date());
      this.usersSvc.updateUser(this.userGroup.value).subscribe((success) => {
        this.updateList();      
      });
    }
  }

  public updateList(): void {
    this.usersSvc.updateData();
    this.close();
  }

  public close() {
    this.router.navigate(['./'], { relativeTo: this.route.parent })
  }

  public edit() {
    this.router.navigate(['manage', this.userData.login], { relativeTo: this.route.parent })    
  }

  public delete() {
    this.usersSvc.deleteUser(this.userData.login).subscribe(result => {
      this.usersSvc.updateData();
      this.close();
    });    
  }
}
