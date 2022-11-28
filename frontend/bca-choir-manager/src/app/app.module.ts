import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './navigation/header/header.component';
import { RoutingModule } from './routing/routing.module';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthButtonComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RoutingModule,
    MaterialModule,

    AuthModule.forRoot({
      domain: 'dev-4s47rktj.us.auth0.com',
      clientId: 'NCrArCjDQio0PWP2hOTMf0cMRUduP6KE'
    }),
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
