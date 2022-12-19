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

  getCalendarMonthArray(): number[][]{
    let  month: number[][] = []; 
    
    let firstDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    let lastDatePrevious = this.getLastDateOfPreviousMonth().getDate();
    let lastDayCurrent = this.getLastDateOfCurrentMonth().getDate();
    let firstDayWeekday = firstDate.getDay();

    let dayIndex = 0;
    let dayNum = 1;
    console.log("Last day current "+ lastDayCurrent);
    console.log("Day index: " + dayIndex);
    console.log("Day num " + dayNum);
    console.log("start of function: " + month);

    month.push([]); // first week
    for (let i = 0; i < firstDayWeekday; i++){
      console.log("Day index: " + dayIndex);
      console.log("Day num " + dayNum);
      month[0].push(lastDatePrevious - (firstDayWeekday - i - 1));
      dayIndex++;
    }

    while (dayNum <= lastDayCurrent){
      console.log("Day index: " + dayIndex);
      console.log("Day num " + dayNum);

      if(Number.isInteger(dayIndex / 7)) {
        month.push([]); // add week
      }
      month[Math.floor(dayIndex / 7)].push(dayNum);

      dayIndex++;
      dayNum++;
    }

    dayNum = 1;
    while(!Number.isInteger(dayIndex/7) && month[Math.floor(dayIndex / 7)].length != 7){
      month[Math.floor(dayIndex / 7)].push(dayNum);
      dayIndex++;
      dayNum++;
    }
    console.log(month);
    return month;
  }

  constructor() {}
}
