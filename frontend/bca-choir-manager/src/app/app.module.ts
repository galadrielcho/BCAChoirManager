import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { RoutingModule } from './routing/routing.module';
import { MaterialModule } from './material/material.module';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { RosterPageComponent } from './pages/roster-page/roster-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthButtonComponent,
    UserProfileComponent,
    HomePageComponent,
    CalendarPageComponent,
    RosterPageComponent,
    AdminPageComponent,
    CalendarComponent,
    DataTableComponent
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
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
