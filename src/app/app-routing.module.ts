// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NewBucketComponent } from './pages/newBucket/new-bucket.component';
import { NewTaskComponent } from './pages/newTask/new-task.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from '../services/auth.gaurd'; // Assuming you have an AuthGuard

const routes: Routes = [
    {
        path: 'bucket',
        component: HomeComponent,
        canActivate: [AuthGuard] // Apply AuthGuard here
    },
    {
        path: 'bucket/:id',
        component: HomeComponent,
        canActivate: [AuthGuard] // Apply AuthGuard here
    },
    {
        path: 'new-bucket',
        component: NewBucketComponent,
        canActivate: [AuthGuard] // Apply AuthGuard here
    },
    {
        path: 'bucket/:id/new-task',
        component: NewTaskComponent,
        canActivate: [AuthGuard] // Apply AuthGuard here
    },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' } // Redirect to home page for unknown routes  
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
