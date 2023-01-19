import { Component, OnInit } from '@angular/core';
import { throwIfEmpty } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CalendarService } from '../../services/calendar-service/calendar.service';
import { EventEditDialogComponent } from '../event-edit-dialog/event-edit-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  
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
  
  openCreateEventDialog() : void {
    const dialogRef = this.dialog.open(EventEditDialogComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  constructor(private calendarService : CalendarService, public dialog: MatDialog){
    this.calendarService.getEvents().subscribe({
      next: data=> {
        console.log(data.events);
      }
    });
  }
}
