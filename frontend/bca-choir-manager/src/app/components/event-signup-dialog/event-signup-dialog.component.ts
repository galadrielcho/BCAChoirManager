import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventData } from '../../models/event-data.model';
import { EventService } from '../../services/event-service/event.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-event-signup-dialog',
  templateUrl: './event-signup-dialog.component.html',
  styleUrls: ['./event-signup-dialog.component.css']
})
export class EventSignupDialogComponent {
  private user_email : string; 

  constructor(
    public dialogRef: MatDialogRef<EventSignupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: 
        { event: EventData,
          partnumber : number,
          signupAction : string,
          voicepart : string
        },
    private eventService : EventService,
    public authService : AuthenticationService) {
      this.user_email = this.authService.getUserEmail();
    }

  public confirm(){  
    if (this.authService.isAuthenticated()) {
      if (this.data.signupAction === "signup"){
        console.log(this.data.partnumber);
        console.log(this.data.voicepart);
        this.eventService.addStudentToEvent(this.user_email, this.data.event, this.data.partnumber, this.data.voicepart);
      }
      else {
      this.eventService.deleteStudentFromEvent(this.user_email, this.data.event)

    }

    }

    this.dialogRef.close();
  }  

  public cancel(){
    this.dialogRef.close();
  }
}