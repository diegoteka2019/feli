import { Login, LoginResponse } from '@app/models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService, NavigationService } from '@app/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  private login: Login = new Login();
  public loginForm: FormGroup;
  public subscription: Subscription;
  public error: boolean = false;

  constructor(private auth: AuthenticationService, private fb: FormBuilder, private router: Router, private nav: NavigationService) {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rememberMe: [false]
    })
  }

  public singIn(login: Login): void {
    this.auth.login(login).subscribe(this.loginSuccess(), this.loginFailure())
  }

  private loginSuccess(): (res: LoginResponse) => void {
    return res => {
      this.auth.saveToken(res.id_token);
      this.nav.goto('');
    }
  }

  private loginFailure(): (error) => void {

    return error => {
      this.error = true;
      let _sleep = setTimeout(() => {
        this.error = false;
        clearInterval(_sleep);
      }, 600)
      alert("Error al loguearse " + error.message)
    }
    
  }

  ngOnDestroy(): void {

  }

}
