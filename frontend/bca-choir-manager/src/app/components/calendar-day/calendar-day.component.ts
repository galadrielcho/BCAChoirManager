import { Component, Input } from '@angular/core';

import { EventData} from '../../models/event-data.model';


@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css']
})
export class CalendarDayComponent {
  @Input('events')  events : EventData[] = [
    {name : "Performance",
    startTime : "1:00pm",
    endTime : "3:00pm",
    location : "BCA",
    address : "600 Hackeintnsack",
    }

  ];  

}
