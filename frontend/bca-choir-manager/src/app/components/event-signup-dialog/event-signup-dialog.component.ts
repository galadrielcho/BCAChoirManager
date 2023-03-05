import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventData } from '../../models/event-data.model';
import { EventService } from '../../services/event-service/event.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-event-signup-dialog',
  templateUrl: './event-signup-dialog.component.html',
  styleUrls: ['./event-signup-dialog.component.css']
})
export class EventSignupDialogComponent {

  constructor(
    

    public dialogRef: MatDialogRef<EventSignupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: 
        { event: EventData,
          partnumber : number,
          signupAction : string,
          voicepart : string
        },
    private eventService : EventService,
    public auth : AuthService) {}

  public confirm(){
    this.eventService.addStudentToEvent("lorcho23@bergen.org", this.data.event, this.data.partnumber, this.data.voicepart);
  
    this.auth.user$.subscribe(
      (user) => {
        if (user?.email != null || user?.email != undefined){
            this.eventService.addStudentToEvent(user.email, this.data.event, this.data.partnumber, this.data.voicepart)
          }
        }
    );

    this.dialogRef.close();
  }  

  public cancel(){
    this.dialogRef.close();
  }
}
