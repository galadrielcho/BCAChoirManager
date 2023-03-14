import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventEditDialogComponent } from '../event-edit-dialog/event-edit-dialog.component';
import { EventData } from 'src/app/models/event-data.model';
import { EventService } from '../../services/event-service/event.service';
import { AuthService } from '@auth0/auth0-angular';

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
  authenticationService: AuthenticationService
  admin: Boolean | undefined
  seconds: number

  constructor(
    public dialogRef: MatDialogRef<EventEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public event: EventData,
    public dialog: MatDialog,
    public eventService : EventService,
    public auth : AuthService,
    public as: AuthenticationService
  ) {
    this.authenticationService = as;
    this.admin = false;
    this.seconds = 0;
    console.log(this.event);
    this.auth.user$.subscribe(
      (user) => {
        if (user?.email != null || user?.email != undefined){
            
          this.eventService.checkStudentInEvent(user.email, event).subscribe(
              (next)=> {
                this.signedup = next; 
              }
          );
        }
      }
    );
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

  
  isAdmin(email: string|undefined){
    if((Date.now()/1000 - this.seconds) > 60){ //checks every minute for if person is still admin
      this.authenticationService.isAdmin(email).then(res => {
        this.admin = res;
      })
      this.seconds = Date.now()/1000;
    }
    
    return this.admin;
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
