import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { RoutingModule } from './routing/routing.module';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { RosterComponent } from './pages/roster/roster.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthButtonComponent,
    UserProfileComponent,
    CalendarComponent,
    RosterComponent,
    AdminComponent,
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
