import { Component, OnInit } from '@angular/core';
import { throwIfEmpty } from 'rxjs';
import { CalendarService } from '../../services/calendar-service/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit{
  public weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];  

  ngOnInit(): void{
    this.calendarService.setDate(new Date());
  }

  setMonthForward(): void{
    this.calendarService.setMonthForward();
  }

  setMonthBackward(): void{  
    this.calendarService.setMonthBackward();
  }

  isInCurrentMonth(dayNum : number, weekNum : number) : boolean{
    return this.calendarService.isInCurrentMonth(dayNum, weekNum);

  }
  getCalendarMonth() : number[][]{
    return this.calendarService.getCalendarMonthArray()
  }

  getDate() : Date {
    return this.calendarService.getDate();
  }

  getCalendarTitle(): string{
    return this.calendarService.getCalendarTitle();
  }

  updateCalendar(date : Date): void{
    this.calendarService.setDate(date);
  }
  
  constructor(private calendarService : CalendarService){
    this.calendarService.getEvents().subscribe({
      next: data=> {
        console.log(data.events);
      }
    });
  }
}
