import { environment } from '../environments/environment';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';

import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { RoutingModule } from './routing/routing.module';
import { MaterialModule } from './material/material.module';
import { AuthModule } from '@auth0/auth0-angular';
import { ToastrModule } from 'ngx-toastr';

import { UserButtonComponent } from './components/user-button/user-button.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { RosterPageComponent } from './pages/roster-page/roster-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { RosterTableComponent } from './components/roster-table/roster-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

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
import { EmailRecipientsInputComponent } from './components/email-recipients-input/email-recipients-input.component';

import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { EventEditDialogComponent } from './components/event-edit-dialog/event-edit-dialog.component';
import { CalendarEventTabComponent } from './components/calendar-event-tab/calendar-event-tab.component';
import { MatMenuModule } from '@angular/material/menu';


import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RosterUpdateComponent } from './components/roster-update/roster-update.component';
import { RosterUpdateService } from './services/roster-update/roster-update.service';
import { MatRadioModule } from '@angular/material/radio'
import { CalendarUpcomingEventsComponent } from './components/calendar-upcoming-events/calendar-upcoming-events.component';
import { EventDescriptionDialogComponent } from './components/event-description-dialog/event-description-dialog.component';

import { EventsPageComponent } from './pages/events-page/events-page.component';
import { EventDeleteDialogComponent } from './components/event-delete-dialog/event-delete-dialog.component';
import { EventTableComponent } from './components/event-table/event-table.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { EventRegistreesDialogComponent } from './components/event-dialog-with-registrees/event-dialog-with-registrees.component';
import { EventSignupDialogComponent } from './components/event-signup-dialog/event-signup-dialog.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { DeleteAdminComponent } from './components/delete-admin/delete-admin.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileContainerComponent } from './components/profile-container/profile-container.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SlideshowModule } from './slideshow';
import { HomePagePopupComponent } from './components/home-page-popup/home-page-popup.component';
import { RecordsDeleteDialogComponent } from './components/records-delete-dialog/records-delete-dialog.component';
import { DeleteAccountDialogComponent } from './components/delete-account-dialog/delete-account-dialog.component';
import { HttpErrorDialogComponent } from './components/http-error-dialog/http-error-dialog.component';
import { UserButtonMobileComponent } from './components/user-button-mobile/user-button-mobile.component';
import { VoicepartLimitDialogComponent } from './components/voicepart-limit-dialog/voicepart-limit-dialog.component';
import { NewVoicepartMaximumDialogComponent } from './components/new-voicepart-maximum-dialog/new-voicepart-maximum-dialog.component';
import { GenericNotificationComponent } from './components/generic-notification/generic-notification.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserButtonComponent,
    HomePageComponent,
    CalendarPageComponent,
    RosterPageComponent,
    AdminPageComponent,
    RosterTableComponent,
    AdminGeneralContainerComponent,
    EmailRecipientsInputComponent,
    CalendarComponent,
    CalendarDayComponent,
    EventEditDialogComponent,
    CalendarEventTabComponent,
    RosterUpdateComponent,
    CalendarUpcomingEventsComponent,
    EventDescriptionDialogComponent,
    EventsPageComponent,
    EventDeleteDialogComponent,
    EventTableComponent,
    SignUpComponent,
    EventRegistreesDialogComponent,
    EventSignupDialogComponent,
    AddAdminComponent,
    DeleteAdminComponent,
    ProfilePageComponent,
    ProfileContainerComponent,
    SidenavComponent,
    HomePagePopupComponent,
    RecordsDeleteDialogComponent,
    DeleteAccountDialogComponent,
    HttpErrorDialogComponent,
    UserButtonMobileComponent,
    VoicepartLimitDialogComponent,
    NewVoicepartMaximumDialogComponent,
    GenericNotificationComponent
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
    MatDialogModule,
    MatMenuModule,
    MatRadioModule,
    SlideshowModule,
    CommonModule,
    ToastrModule.forRoot(),
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      // redirect_uri: environment.auth0.redirect_uri,
      audience: environment.auth0.audience,
      useRefreshTokens: true

    }),
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
  ],
  
  providers: [
    RosterUpdateService,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [RosterUpdateComponent]
})
export class AppModule { }
