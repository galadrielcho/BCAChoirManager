import { Component, OnInit, HostListener } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CalendarService } from '../../services/calendar-service/calendar.service';
import { EventEditDialogComponent } from '../event-edit-dialog/event-edit-dialog.component';
import { CalendarDayData} from '../../models/calendar-day-data.model';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  
})

export class CalendarComponent implements OnInit{
  public weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];  
  admin : Boolean | undefined;
  service : CalendarService;

  currentWindowWidth: number = 0;
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.currentWindowWidth = window.innerWidth;
  }
  
  constructor(private calendarService : CalendarService, private dialog: MatDialog, private authService : AuthenticationService){
    this.service = calendarService;
  }

  ngOnInit(): void{
    this.currentWindowWidth = window.innerWidth;
    this.calendarService.setDate(new Date());
  }

  changed(value : boolean){
    this.calendarService.setDisplayAttending(value);
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  getAdmin() {
    return this.authService.isAdmin();
  }
  setMonthForward(): void{
    this.calendarService.setMonthForward();
  }

  setMonthBackward(): void{  
    this.calendarService.setMonthBackward();
  }

  getCalendarMonth() : CalendarDayData[][]{
    let month = this.calendarService.getCalendarMonthArray();

    if (month.length > 0) {
      if (this.authService.isConcert()) {
        month = this.calendarService.filterOutConcertEventsOnly(month);
      }
    }
    return month;
  }

  getDate() : Date {
    return this.calendarService.getDate();
  }

  getCurrentDate(date : number, weekNum: number){
    if(this.isInCurrentMonth(date, weekNum)){
      return new Date(this.service.getDate().getFullYear(), this.service.getDate().getMonth(), date);
    }
    else if(weekNum == 0){
      return new Date(this.getPrevious(this.service.getDate().getMonth())[0], this.getPrevious(this.service.getDate().getMonth())[1], date);;
    }
    else{
      return new Date(this.getNext(this.service.getDate().getMonth())[0], this.getNext(this.service.getDate().getMonth())[1], date);;
    }
    
  }
  
  
getPrevious(month: number): [number, number] { //returns [year, month]
  const currentDate = this.service.getDate();
  let prevYear = currentDate.getFullYear();
  let prevMonth = month - 1;

  if ((prevMonth) < 0) {
    prevMonth = 11;
    prevYear--;
  }

  return [prevYear, prevMonth];
}

getNext(month: number): [number, number] { //returns [year, month]
  const currentDate = this.service.getDate();
  let nextYear = currentDate.getFullYear();
  let nextMonth = month + 1;

  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear++;
  }

  return [nextYear, nextMonth];
}

  getCalendarTitle(): string{
    return this.calendarService.getCalendarTitle();
  }

  updateCalendar(date : Date): void{
    this.calendarService.setDate(date);
  }
  
  isInCurrentMonth(dayNum : number, weekNum : number) : boolean{
    return this.calendarService.isInCurrentMonth(dayNum, weekNum);
  }

  openCreateEventDialog() : void {
    const dialogRef = this.dialog.open(EventEditDialogComponent, {
      width: '500px',
      data: null
    });

  }
}
