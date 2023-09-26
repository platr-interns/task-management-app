import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'localhost:3050';

  constructor(private http: HttpClient) { }

  public async login(form: FormGroup) {
    const url = `${this.baseUrl}/auth/Login`;
    const login = {
      email: form.controls["email"].value,
      password: form.controls["password"].value,
  }
    
    return this.http.post(url, login).subscribe(
      (Response)=>{console.log(Response);
      },
      (error)=>{console.error(error);}
    );
  }

  public async signup(form: FormGroup) {
    const url = `${this.baseUrl}/auth/signup`;
    const user = {
      email: form.controls["email"].value,
      name: form.controls["name"].value,
      password: form.controls["password"].value,
  }
    
    return this.http.post(url, user).subscribe(
      (Response)=>{console.log(Response);
      },
      (error)=>{console.error(error);}
    );
  }


}