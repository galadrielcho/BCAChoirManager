import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CalendarService {
  private date = new Date();

  setDate(date : Date) :void{
    this.date = date;
  }

  getDate() :Date{
    return this.date;
  }

  getLastDateOfCurrentMonth(){
   return new Date(this.date.getFullYear(), this.date.getMonth()+1, 0); 
  }

  getLastDateOfPreviousMonth(){
    return new Date(this.date.getFullYear(), this.date.getMonth(), 0); 
  }

  getCalendarMonthArray(): number[][]{
    let  month: number[][] = [[], [] , [], [], []]; // 5 weeks in calendar month
    
    let firstDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    let lastDatePrevious = this.getLastDateOfPreviousMonth().getDate();
    let lastDayCurrent = this.getLastDateOfCurrentMonth().getDate();
    let firstDayWeekday = firstDate.getDay();

    let dayIndex = 0;
    let dayNum = 1;

    for (let i = 0; i < firstDayWeekday; i++){
      month[0].push(lastDatePrevious - (firstDayWeekday - i - 1));
      dayIndex++;
    }

    while (dayNum <= lastDayCurrent){
      console.log(month);
      month[Math.floor(dayIndex / 7)].push(dayNum);
      dayIndex++;
      dayNum++;
    }

    dayNum = 1;
    while(dayIndex < 35){
      month[Math.floor(dayIndex / 7)].push(dayNum);
      dayIndex++;
      dayNum++;
    }
    return month;
  }

  constructor() {}
}
