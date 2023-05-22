import { Component } from '@angular/core';
import { CalendarService} from '../../services/calendar-service/calendar.service';
import { EventData } from 'src/app/models/event-data.model';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-calendar-upcoming-events',
  templateUrl: './calendar-upcoming-events.component.html',
  styleUrls: ['./calendar-upcoming-events.component.css']
})
export class CalendarUpcomingEventsComponent {

  events : EventData[] = [];
  
  constructor(public cs: CalendarService, private as : AuthenticationService) { 
    this.retrieveEvents();
  }

  retrieveEvents() {
    let e = this.cs.getEvents();
    console.log("retrieve");
    this.events = e.map(obj => ({...obj}));
    
    if (this.as.isConcert()) {
      this.events = this.events.filter((event) => (event.choir_type === 0 || event.choir_type == "Concert"));
    }
    return this.events;
  }
}