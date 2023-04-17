import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventEditDialogComponent } from '../event-edit-dialog/event-edit-dialog.component';
import { EventData } from 'src/app/models/event-data.model';
import { EventService } from '../../services/event-service/event.service';

import { EventDeleteDialogComponent } from '../event-delete-dialog/event-delete-dialog.component';
import { EventSignupDialogComponent } from '../event-signup-dialog/event-signup-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-event-description-dialog',
  templateUrl: './event-description-dialog.component.html',
  styleUrls: ['./event-description-dialog.component.css']
})
export class EventDescriptionDialogComponent {
  public voiceparts : string[] = ["Soprano", "Alto", "Tenor", "Bass"];
  public numbers : number[] = [1, 2];

  public partNumber = 1;
  public signedup = false;
  public voicepart = "Soprano";
  admin: Boolean | undefined
  seconds: number

  constructor(
    public dialogRef: MatDialogRef<EventEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public event: EventData,
    public dialog: MatDialog,
    public eventService : EventService,
    public authService: AuthenticationService
  ) {
    this.admin = false;
    this.seconds = 0;



    if (this.authService.isAuthenticated() && !this.authService.getUserAdmin()) {
      this.eventService.checkStudentInEvent(this.authService.getUserEmail(), event).subscribe(
        (next)=> {
          this.signedup = next; 
        }
    );

    }
  }

  openDeleteEventDialog(): void {
    const dialogRef = this.dialog.open(EventDeleteDialogComponent, {
      width: '300px',
      data: this.event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getSignedUp() {
    
  }
  isAdmin(){
    return this.authService.getUserAdmin();
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  
  close(): void {
    this.dialogRef.close();
  }

  moreInfo() : void {
    this.dialogRef.close();
  }

  deleteEvent() : void {
    this.close();
    this.openDeleteEventDialog();

  }

  confirmSignupEvent() : void {
    console.log("asjdofia" + this.signedup);
    this.close();
    const dialogRef = this.dialog.open(EventSignupDialogComponent, {
      width: '500px',
      data: {
            event: this.event,
            partnumber: this.partNumber,
            signupAction: this.signedup? "signup" : "unsignup",
            voicepart: this.voicepart}
    });    
  } 

  editEvent() : void {

    this.close();
    const dialogRef = this.dialog.open(EventEditDialogComponent, {
      width: '500px',
      data: this.event
    });

  }
}
