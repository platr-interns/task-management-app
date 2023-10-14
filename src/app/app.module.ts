import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NewBucketComponent } from './pages/newBucket/new-bucket.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { NewTaskComponent } from './pages/newTask/new-task.component';
// Import other modules and components

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewBucketComponent,
    NewTaskComponent,
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    HttpClientModule,
    AppRoutingModule // Add the AppRoutingModule here
    // Add other modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
