import { Component } from '@angular/core';



@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css']
})
export class CalendarDayComponent {
  public events = [
    {event_name : "Performance",
    start_time : "1:00pm",
    end_time : "3:00pm",
    location : "BCA",
    address : "600 Hackeintnsack"
    }

  ];  

}
