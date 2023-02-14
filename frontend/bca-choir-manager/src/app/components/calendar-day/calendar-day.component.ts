import { Component, Input } from '@angular/core';

import { EventData} from '../../models/event-data.model';


@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css']
})
export class CalendarDayComponent {
  @Input('events')  events : EventData[] = [];  

}
