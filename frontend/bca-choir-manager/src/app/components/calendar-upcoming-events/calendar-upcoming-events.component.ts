import { Component } from '@angular/core';
import { CalendarService} from '../../services/calendar-service/calendar.service';

@Component({
  selector: 'app-calendar-upcoming-events',
  templateUrl: './calendar-upcoming-events.component.html',
  styleUrls: ['./calendar-upcoming-events.component.css']
})
export class CalendarUpcomingEventsComponent {
  constructor(public cs: CalendarService) { 
  }
}