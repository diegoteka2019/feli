import { Column } from '@app/models/table/table.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '@app/models';
import { UsersService } from '@app/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: Array<User>;
  public cols: Array<Column>;
  
  constructor(private router: Router, private route: ActivatedRoute, private usersSvc: UsersService) {
    this.cols = [
      { title: 'Nombre', orderBy: 'firstName' },
      { title: 'Apellido', orderBy: null },
      { title: 'Activado', orderBy: null },
      { title: 'Imagen', orderBy: null }
    ]
  }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.usersSvc.lastData$.subscribe((data) => {
      if(!data) {
        this.usersSvc.updateData();
      } else {
        this.users = data;
      }
    });
    
  }

  public newUser(): void {
    this.router.navigate(['/usuarios']).then(() => {
      this.router.navigate(['manage', 'new'], { relativeTo: this.route });
    })
  }

  public editUser(user: User): void {
    event.cancelBubble = true;
    this.router.navigate(['manage', user.login], { relativeTo: this.route })
  }

  public deleteUser(user: User): void {
    event.cancelBubble = true;

    this.usersSvc.deleteUser(user.login).subscribe(result => {
      this.usersSvc.updateData();
    });
  }

  public viewUser(user: User): void {
    this.router.navigate(['manage', user.login], { queryParams: { mode: 'readonly' }, relativeTo: this.route })
  }

  public getFullImageUrl(imageUrl: string | undefined): string {
    if (imageUrl) {
      return environment.baseUrl + environment.assets + imageUrl;
    }
    return "";
  }
}
