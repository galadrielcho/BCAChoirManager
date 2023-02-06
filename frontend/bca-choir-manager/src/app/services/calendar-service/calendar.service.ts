import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventData} from '../../models/event-data.model';
import { CalendarDayData} from '../../models/calendar-day-data.model';

@Injectable({
  providedIn: 'root'
})

export class CalendarService {
  
  private date : Date = new Date();   
  private calendarURL = '/api/get-calendar-events/';
  private calendarMonth : CalendarDayData[][] = []; 
  private events : EventData[]= []; 

  setDate(date : Date) :void{
    this.date = date;
  }

  getDate() : Date{
    return this.date;
  }

  setMonthForward() : void {
    this.date.setMonth(this.date.getMonth() + 1);
  }

  setMonthBackward() : void {
    this.date.setMonth(this.date.getMonth() - 1);
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
    let eventStartDate = new Date(eventData.start_time);
    let eventEndDate = new Date(eventData.end_time);

    console.log("testing!!");
    console.log(eventStartDate);
    console.log(eventEndDate);
    console.log(date);
    console.log(eventStartDate.getTime());
    console.log(eventEndDate.getTime());
    console.log(date.getTime());
    console.log((eventStartDate.getTime() <= date.getTime() 
    && eventEndDate.getTime() >= date.getTime()));

    return (eventStartDate.getTime() <= date.getTime() 
            && eventEndDate.getTime() >= date.getTime());

  }

  getEventOverlap(date : Date) : EventData[]{
    let eventOverlap : EventData[] = [];
    for (let i = 0; i < this.events.length; i++){
      if (this.checkEventHasDate(this.events[i], date)){
        eventOverlap.push(this.events[i])
      }
    }
    console.log(eventOverlap)
    return eventOverlap;
  }
  
  goThroughCalendarMonth() : void{
    
    let events = this.events.slice();
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

  constructor(private http: HttpClient){

    let url = `${this.calendarURL}/${this.getFirstDateOfCalendarMonth().getTime()}/${this.getLastDateOfCalendarMonth().getTime()}`; 
    http.get<any>(url).subscribe({
      next: data => {

        for(let i = 0; i < data.events.length; i++){
        
          let event : EventData =  {event_name: data.events[i][0], 
            start_time: data.events[i][1],
            end_time: data.events[i][2],
            location: data.events[i][3],
            address: data.events[i][4]
            }
          this.events.push(event);

        } 
        this.goThroughCalendarMonth();
      },
      error: error=>{
        this.goThroughCalendarMonth();
      }
      }
      

    );
  }
}
