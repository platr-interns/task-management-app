import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public form: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]], 
      email: [null, [Validators.required]], 
      password: [null, [Validators.required]], 
      
      
    }) 
  } 

  public signup(): void {
    this.authService.signup(this.form)
    
  }
}
