import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventEditDialogComponent } from '../event-edit-dialog/event-edit-dialog.component';
import { EventData } from 'src/app/models/event-data.model';
import { EventService } from '../../services/event-service/event.service';

import { EventDeleteDialogComponent } from '../event-delete-dialog/event-delete-dialog.component';
import { EventSignupDialogComponent } from '../event-signup-dialog/event-signup-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { RosterUpdateService } from 'src/app/services/roster-update/roster-update.service';
import { VoicepartLimitDialogComponent } from '../voicepart-limit-dialog/voicepart-limit-dialog.component';
import { SignupCount } from 'src/app/models/signup-count.model';
import { VoicepartLimit } from 'src/app/models/voicepart-limit.model';
import { ErrorService } from 'src/app/services/error-service/error.service';
import { GenericNotificationComponent } from '../generic-notification/generic-notification.component';

@Component({
  selector: 'app-event-description-dialog',
  templateUrl: './event-description-dialog.component.html',
  styleUrls: ['./event-description-dialog.component.css']
})
export class EventDescriptionDialogComponent {
  public voiceparts : string[] = ["soprano", "alto", "tenor", "bass"];
  public numbers : number[] = [1, 2];

  public signedup = false;
  private signedUpOriginally = false;
  public partNumber = 1; //default value
  public voicepart = "soprano"; //default value
  admin: Boolean | undefined
  seconds: number

  private signupCount : SignupCount[] = [];
  private voicepartLimit : VoicepartLimit[] = [];

  constructor(
    public dialogRef: MatDialogRef<EventEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public event: EventData,
    public dialog: MatDialog,
    public eventService : EventService,
    public authService: AuthenticationService,
    public studentService: RosterUpdateService,
    public errorService : ErrorService
  ) {
    this.admin = false;
    this.seconds = 0;
    if (this.authService.isAuthenticated() && !this.authService.isAdmin()) {
      this.eventService.checkStudentInEvent(this.authService.getUserEmail(), event).subscribe(
        (next)=> {
          this.signedup = next; 
          this.signedUpOriginally = next;
          if(this.signedup == true){
            //get voicepart name and number based on event signup data
            this.eventService.getVoicePartDetails(this.authService.getUserEmail(), event).subscribe({
              next: data => {
                this.voicepart = data.details[0].voicepart_name;
                this.partNumber = data.details[0].number;
              }
            });

          }
          else if(this.signedup == false){
            //get voicepart name and number based on student's original data
            this.studentService.getAccountDetails(this.authService.getUserEmail()).subscribe({
              next: data => {
                this.voicepart = data.details.voicepart_name;
                try{
                  this.partNumber = Number(data.details.number);
                }
                catch{} //If part number cannot be converted, the voice part number field will be left blank
              }      
            }); 
          }
        }
    );
      this.eventService.getSignupCounts(this.event).subscribe({
        next: data=>{
          this.signupCount = data;
        }
      });
      this.eventService.getVoicepartLimit(this.event).subscribe({
        next: data=>{
          this.voicepartLimit = data;
        }
      });
    }
  }

  openDeleteEventDialog(): void {
    const dialogRef = this.dialog.open(EventDeleteDialogComponent, {
      width: '300px',
      data: this.event
    });

  }

  getSignedUp() {
    
  }
  isAdmin(){
    return this.authService.isAdmin();
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

  hasSignupSpace() : boolean{
    let i, j;

    for (i =0; i < this.signupCount.length; i++){
      let signup = this.signupCount[i];
      if (signup.voicepart_name === this.voicepart
        && signup.voicepart_number === this.partNumber){
          for (j =0; j < this.voicepartLimit.length; j++){
            let limit = this.voicepartLimit[j];
            if (limit.voicepart_name === this.voicepart
              && limit.number === this.partNumber){
                return ( signup.signed_up < limit.maximum)

          }
        }
    }
  }
    return true;
  }

  confirmSignupEvent() : void {
    if (this.hasSignupSpace()){
      this.close();
      if (this.signedUpOriginally == false && this.signedup == false) {
        const dialogRef = this.dialog.open(GenericNotificationComponent, {
          width: '500px',
          data:'No changes were made to sign up.'
        }); 
      } else {
        const dialogRef = this.dialog.open(EventSignupDialogComponent, {
          width: '500px',
          data: {
                event: this.event,
                partnumber: this.partNumber,
                signupAction: this.signedup? "signup" : "unsignup",
                voicepart: this.voicepart}
        }); 
  
      }
    }   
    else{
      this.errorService.showErrorDialog(`No more available slots for ${this.voicepart} ${this.partNumber}`);
    }
  } 

  editEvent() : void {

    this.close();
    const dialogRef = this.dialog.open(EventEditDialogComponent, {
      width: '500px',
      data: this.event
    });

  }
  voicepartLimits() : void {

    this.close();
    const dialogRef = this.dialog.open(VoicepartLimitDialogComponent, {
      width: '600px',
      data: this.event
    });

  }
}

