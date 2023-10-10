import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder

  ) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],

    })
  }
  public login(): void {
    this.authService.login(this.form)
  }

}

