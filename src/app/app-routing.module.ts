// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/home/login/login.component';
import { SignupComponent } from './pages/home/signup/signup.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: '' } // Redirect to home page for unknown routes
   
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
