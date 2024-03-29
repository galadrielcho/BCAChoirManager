import { AuthGuardModified } from '../guards/auth-guard-modified';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { RosterPageComponent } from '../pages/roster-page/roster-page.component';
import { CalendarPageComponent } from '../pages/calendar-page/calendar-page.component';
import { AdminPageComponent } from '../pages/admin-page/admin-page.component';
import { EventsPageComponent } from '../pages/events-page/events-page.component';
import { AdminGuard } from './admin-guard/admin.guard';
import { CallbackComponent } from '../pages/callback-page/callback-page';
import { ProfilePageComponent } from '../pages/profile-page/profile-page.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent},
  { path: 'calendar', component: CalendarPageComponent},
  { path: 'roster',
    component: RosterPageComponent,
    canActivate: [AuthGuardModified]
  },
  { path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuardModified, AdminGuard]
  },
  { path: 'events',
    component: EventsPageComponent,
    canActivate: [AuthGuardModified, AdminGuard]
  },
  { path: 'profile',
  component: ProfilePageComponent,
  canActivate: [AuthGuardModified]
  },
  { path: 'callback',
  component: CallbackComponent},
  { path: '**', redirectTo: '/home',}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
  ]
})
export class RoutingModule { }