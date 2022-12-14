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
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { RosterPageComponent } from './pages/roster-page/roster-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AdminEmailContainerComponent } from './components/admin-email-container/admin-email-container.component';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatChipsModule}  from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatIconModule } from '@angular/material/icon';
import { AdminGeneralContainerComponent } from './components/admin-general-container/admin-general-container.component';
import { AdminSettingsContainerComponent } from './components/admin-settings-container/admin-settings-container.component';
import { EmailRecipientsInputComponent } from './components/email-recipients-input/email-recipients-input.component';

import { CalendarComponent } from './components/calendar/calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthButtonComponent,
    HomePageComponent,
    CalendarPageComponent,
    RosterPageComponent,
    AdminPageComponent,
    DataTableComponent,
    AdminEmailContainerComponent,
    AdminGeneralContainerComponent,
    AdminSettingsContainerComponent,
    EmailRecipientsInputComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RoutingModule,
    MaterialModule,
    MatCardModule,
    MatTabsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  MatAutocompleteModule,

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
