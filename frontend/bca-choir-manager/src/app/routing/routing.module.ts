import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { RosterPageComponent } from '../pages/roster-page/roster-page.component';
import { CalendarPageComponent } from '../pages/calendar-page/calendar-page.component';
import { AdminPageComponent } from '../pages/admin-page/admin-page.component';
import { EventsPageComponent } from '../pages/events-page/events-page.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent},
  { path: 'calendar', component: CalendarPageComponent},
  { path: 'roster', component: RosterPageComponent},
  { path: 'admin', component: AdminPageComponent},
  { path: 'events', component: EventsPageComponent},

  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }