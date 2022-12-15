import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar-service/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  public weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];  
  public calendarMonth : number[][];

  ngOnInit(): void{
    this.calendarService.setDate(new Date());
    console.log("Last current:");
    console.log(this.calendarService.getCalendarMonthArray());

  }

  updateCalendar(date : Date): void{
    this.calendarService.setDate(date);
    this.calendarMonth = this.calendarService.getCalendarMonthArray();
  }
  
  constructor(private calendarService : CalendarService){
    this.calendarMonth = this.calendarService.getCalendarMonthArray();
  }
}
