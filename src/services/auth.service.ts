import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private baseUrl = 'http://localhost:3050';
  private baseUrl = 'https://task-management-application-backend.vercel.app';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();


  constructor(private http: HttpClient, private userDataService: UserDataService) { }

  public async login(form: FormGroup) {
    const url = `${this.baseUrl}/auth/signin`;
    const login = {
      email: form.controls["email"].value,
      password: form.controls["password"].value,
    }

    return this.http.post(url, login).subscribe(
      (Response: any) => {
        const userName = Response.data.name
        const userId = Response.data._id;
        this.userDataService.setUserData(userId, userName)
        this.isAuthenticatedSubject.next(true);
        console.log(Response);
      },
      (error) => { console.error(error); }
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
      (Response: any) => {
        const userName = Response.data.name
        const userId = Response.data._id;
        this.userDataService.setUserData(userId, userName)
        this.isAuthenticatedSubject.next(true);
        console.log(Response);
      },
      (error) => { console.error(error); }
    );
  }


}