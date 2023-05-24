import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventData} from '../../models/event-data.model';
import { CalendarDayData} from '../../models/calendar-day-data.model';
import { EventService } from '../event-service/event.service';
import { ErrorService } from '../error-service/error.service';


@Injectable({
  providedIn: 'root'
})

export class CalendarService {
  
  private date : Date = new Date();   
  private calendarMonth : CalendarDayData[][] = []; 
  private events : EventData[]= []; 
  public displayAttending: boolean = false;

  constructor(private http: HttpClient, private eventService : EventService, private errorService :ErrorService){
    this.eventService.setCalendarService(this);
  }

  setDisplayAttending(value : boolean){
    this.displayAttending = value;
  }

  setDate(date : Date) :void{
    this.date = date;
    this.loadCalendarEvents();
  }

  getDate() : Date{
    return this.date;
  }

  setMonthForward() : void {
    this.date.setMonth(this.date.getMonth() + 1);
    this.loadCalendarEvents();
  }

  setMonthBackward() : void {
    this.date.setMonth(this.date.getMonth() - 1);
    this.loadCalendarEvents();
  }

  getLastDateOfCurrentMonth(){
   return new Date(this.date.getFullYear(), this.date.getMonth()+1, 0); 
  }

  getLastDateOfPreviousMonth(){
    return new Date(this.date.getFullYear(), this.date.getMonth(), 0); 
  }

  getCalendarTitle(){
    return this.date.toLocaleString('default', { month: 'long' }) + " "+ this.getDate().getFullYear();
  }

  isInCurrentMonth(dayNum : number, weekNum : number){
    if (weekNum < 1 && dayNum > 7) return false;  // previous month
    if (weekNum > 1 && dayNum <= 7) return false; // following month

    return true; // curent month
  }
      
  getEvents() {
    return this.events;
  }

  getFirstDateOfCalendarMonth() : Date {
    let startOfMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
   
    startOfMonth.setDate(startOfMonth.getDate() - startOfMonth.getDay());
    return startOfMonth;
  }

  getLastDateOfCalendarMonth() : Date{
    let lastOfMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0);
    lastOfMonth.setDate(lastOfMonth.getDate() - lastOfMonth.getDay()+6);

    return lastOfMonth; 
  }

  getCalendarMonthArray() : CalendarDayData[][]{
    return this.calendarMonth;
  }

  checkEventHasDate(eventData : EventData, date : Date) : boolean{
    const eventStartDate = new Date(eventData.start_time);
    const eventEndDate = new Date(eventData.end_time);


    date.setHours(0, 0, 0, 0);
    const startDate = new Date(date.getTime());
    date.setHours(23, 59, 59, 0);
    const endDate = new Date(date.getTime());
    
    return  (
        eventStartDate <= startDate
        && eventEndDate >= startDate
        || 
          eventStartDate >= startDate 
          && eventStartDate <= endDate);

  }

  getEventOverlap(date : Date) : EventData[]{
    let eventOverlap : EventData[] = [];
    for (let i = 0; i < this.events.length; i++){
      if (this.checkEventHasDate(this.events[i], date)){
        eventOverlap.push(this.events[i])
      }
    }
    return eventOverlap;
  }
  
  goThroughCalendarMonth() : void{
    this.calendarMonth = []; 
    
    let firstDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    let lastDatePreviousMonth = this.getLastDateOfPreviousMonth();
    let lastDateCurrentMonth = this.getLastDateOfCurrentMonth();
    let firstDayWeekday = firstDate.getDay();
    
    let dayIndex = 0;
    let dayNum = 0;

    this.calendarMonth.push([]); // first week, adding days in past month that fit in calendar
    for (let i = 0; i < firstDayWeekday; i++){
      let dayNum = lastDatePreviousMonth.getDate() - (firstDayWeekday - i - 1);

      let date = new Date(lastDatePreviousMonth)
      date.setDate(dayNum);
      this.calendarMonth[0].push({date: dayNum, events:this.getEventOverlap(date)});
      dayIndex++;
    }


    dayNum = 1;
    while (dayNum <= lastDateCurrentMonth.getDate()){
      if(Number.isInteger(dayIndex / 7)) {
        this.calendarMonth.push([]); // add week
      }
      let date = new Date(this.date)
      date.setDate(dayNum);

      this.calendarMonth[Math.floor(dayIndex / 7)].push({date: dayNum, events:this.getEventOverlap(date)});

      dayIndex++;
      dayNum++;
    }

    // last week, adding days in next month that fit in calendar
    dayNum = 1;
    while(!Number.isInteger(dayIndex/7) && this.calendarMonth[Math.floor(dayIndex / 7)].length != 7){
      
      let date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
      this.calendarMonth[Math.floor(dayIndex / 7)].push({date: dayNum, events:this.getEventOverlap(date)});
      dayIndex++;
      dayNum++;
    }
  }

  loadCalendarEvents(){
    let endDateRange : Date = new Date(this.getLastDateOfCalendarMonth());
    endDateRange.setHours(23, 59, 59, 0);

    this.eventService.getEventsInRange(this.getFirstDateOfCalendarMonth(), endDateRange)
      .subscribe({
        next: (events: EventData[])=> {
          this.events = events;
          this.goThroughCalendarMonth();
        },
        error: error=>{
          this.errorService.showErrorDialog("Could not retrieve events from database.")
          this.goThroughCalendarMonth();
        }
      });
  }

  filterOutConcertEventsOnly(month : CalendarDayData[][]) : CalendarDayData[][] {
    for (let week = 0; week < month.length; week++){
      for (let day = 0; day < month[week].length; day++){
        month[week][day].events = month[week][day].events.filter((event) => (event.choir_type === 0 || event.choir_type == "Concert"));
      }
    }
    
    return month;
  }

  
}
