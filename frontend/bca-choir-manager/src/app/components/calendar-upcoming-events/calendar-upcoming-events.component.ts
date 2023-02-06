import { Component } from '@angular/core';
import { CalendarService} from '../../services/calendar-service/calendar.service';
import { EventData} from '../../models/event-data.model';

@Component({
  selector: 'app-calendar-upcoming-events',
  templateUrl: './calendar-upcoming-events.component.html',
  styleUrls: ['./calendar-upcoming-events.component.css']
})
export class CalendarUpcomingEventsComponent {
  
  public events : EventData[]= []; 

  constructor(private cs: CalendarService) { 
    this.events = cs.getEvents();
  }
}