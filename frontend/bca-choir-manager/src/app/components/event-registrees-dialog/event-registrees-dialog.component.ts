import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventData } from 'src/app/models/event-data.model';
import { EventService } from 'src/app/services/event-service/event.service';

@Component({
  selector: 'app-event-registrees-dialog',
  templateUrl: './event-registrees-dialog.component.html',
  styleUrls: ['./event-registrees-dialog.component.css']
})
export class EventRegistreesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventRegistreesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public event: EventData,
    public dialog: MatDialog,
    private eventService : EventService,

  ) {}

  ngOnInit(): void {
    this.getRegistrees();
  };


  close(): void {
    this.dialogRef.close();
  }

  editMode() : void {
    this.dialogRef.close();
  }

  getRegistrees() : void {
    this.eventService.getEventRegistrees(this.event).subscribe(
      result => {
        console.log(result);
      }

    );
  }


}
