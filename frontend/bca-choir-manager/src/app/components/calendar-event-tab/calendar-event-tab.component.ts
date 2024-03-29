import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventDescriptionDialogComponent } from '../event-description-dialog/event-description-dialog.component';
import { EventData } from 'src/app/models/event-data.model';
import { EventService } from 'src/app/services/event-service/event.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { CalendarService } from 'src/app/services/calendar-service/calendar.service';

@Component({
  selector: 'calendar-event-tab',
  templateUrl: './calendar-event-tab.component.html',
  styleUrls: ['./calendar-event-tab.component.css']
})
export class CalendarEventTabComponent {
  @Input('event') event: EventData | null = null;
  @Input('date') date : Date | null = null;
  public attending : string = "";
  public isConcert : boolean = true;
  public day_number: string = "";
  public executed : boolean = false;
  
  constructor(public dialog: MatDialog, 
    public eventService : EventService,
    public authService: AuthenticationService,
    private calendarService : CalendarService) {}
  
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes['date'] && !this.executed){
      this.day_number = this.calculateDayNumber();
      this.executed = true;
    }
  }
  

  checkDisplay(){
    if(this.calendarService.displayAttending == true){
      this.checkAttendance();
      return true;
    }
    else{
      this.attending = "";
      return false;
    }
  }

  calculateDayNumber(){

    if(this.event && this.date){
      
      let start_time = new Date(Number(this.event.start_time.substring(0,4)), Number(this.event.start_time.substring(5,7)) - 1, Number(this.event.start_time.substring(8,10)));
      if(this.event.start_time == this.event.end_time){
        if(this.event.event_name == "Multi-Day"){
        }
        return "";
      }
      else if(this.date != null){
        if (this.date.getTime() > start_time.getTime()) { // this.date is after this.start_time
          const daysDiff = Math.floor((this.date.getTime() - start_time.getTime()) / 86400000);
          return " (Day " + String(daysDiff + 1) + ")";
        } 
        else{
          return "";
        }

      }
      else{
        return "";
      }
    }
    else{
      return "";
    }

  }

  checkAttendance(){
    if (this.authService.isAuthenticated() && !this.authService.isAdmin() && this.event) {
      this.eventService.checkStudentInEvent(this.authService.getUserEmail(), this.event).subscribe(
        (next)=> {
          if(next){
            this.attending = " (attending)"
          }
        }
      );
    }
  }

  openEventDialog(): void {
    if (this.event  != null) {
      let endTime = new Date(this.event.end_time).toLocaleString();
      let startTime = new Date(this.event.start_time).toLocaleString();
  
      const dialogRef = this.dialog.open(EventDescriptionDialogComponent, {
        width: '500px',
        data: this.event
      })};
  
  }
}
