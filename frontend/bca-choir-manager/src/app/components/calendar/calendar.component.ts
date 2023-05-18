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

  getCurrentDate(date : number) : Date{
    return new Date(this.service.getDate().getFullYear(), this.service.getDate().getMonth()+1, date);
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
