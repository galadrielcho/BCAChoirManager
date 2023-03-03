import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventData } from '../../models/event-data.model';
import { EventService } from '../../services/event-service/event.service';

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
        }) {}

  public confirm(){
    return;
  }

  public cancel(){
    this.dialogRef.close();
  }
}
