import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventDescriptionDialogComponent } from '../event-description-dialog/event-description-dialog.component';
import { EventData } from 'src/app/models/event-data.model';
import { EventService } from 'src/app/services/event-service/event.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'calendar-event-tab',
  templateUrl: './calendar-event-tab.component.html',
  styleUrls: ['./calendar-event-tab.component.css']
})
export class CalendarEventTabComponent implements OnChanges {
  @Input('event') event: EventData | null = null;
  public attending : string = "";
  
  constructor(public dialog: MatDialog, 
    public eventService : EventService,
    public authService: AuthenticationService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['event'] && changes['event'].currentValue) {
      this.checkAttendance();
    }
  }

  checkAttendance(){
    if (this.authService.isAuthenticated() && !this.authService.isAdmin() && this.event) {
      console.log("here");
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
