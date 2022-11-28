import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { RosterComponent } from '../pages/roster/roster.component';
import { CalendarComponent } from '../pages/calendar/calendar.component';
import { AdminComponent } from '../pages/admin/admin.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: 'roster', component: RosterComponent},
  { path: 'admin', component: AdminComponent},

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