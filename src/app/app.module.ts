import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NewListComponent } from './pages/new-list/new-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule // Add the AppRoutingModule here
    // Add other modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
