import { Component } from '@angular/core';



@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css']
})
export class CalendarDayComponent {
  public events = [
    {name : "Performance",
    startTime : "1:00pm",
    endTime : "3:00pm",
    location : "BCA",
    address : "600 Hackeintnsack",
    id : "Performance1:00pm"
    }

  ];  

}
