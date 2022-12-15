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
  public calendarTitle : string;

  ngOnInit(): void{
    this.calendarService.setDate(new Date());
  }

  setMonthForward(): void{
    console.log("forward");
    this.calendarService.setMonthForward();
    this.updateCalendar(this.getDate());

  }

  setMonthBackward(): void{    
    console.log("backward");
    this.calendarService.setMonthBackward();
    this.updateCalendar(this.getDate());
  }

  getDate() : Date {
    return this.calendarService.getDate();
  }

  updateCalendar(date : Date): void{
    this.calendarService.setDate(date);
    this.calendarMonth = this.calendarService.getCalendarMonthArray();
    this.calendarTitle = this.getDate().toLocaleString('default', { month: 'long' }) + " "+ this.getDate().getFullYear();

  }
  
  constructor(private calendarService : CalendarService){
    this.calendarMonth = this.calendarService.getCalendarMonthArray();
    this.calendarTitle = this.getDate().toLocaleString('default', { month: 'long' }) + " "+ this.getDate().getFullYear();

  }
}
