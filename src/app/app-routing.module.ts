// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NewListComponent } from './pages/new-list/new-list.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'new-list', component: NewListComponent },
    { path: '**', redirectTo: '' } // Redirect to home page for unknown routes
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
