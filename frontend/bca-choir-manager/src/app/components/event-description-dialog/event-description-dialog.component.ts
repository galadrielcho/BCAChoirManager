import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventEditDialogComponent } from '../event-edit-dialog/event-edit-dialog.component';
import { EventData } from 'src/app/models/event-data.model';

@Component({
  selector: 'app-event-description-dialog',
  templateUrl: './event-description-dialog.component.html',
  styleUrls: ['./event-description-dialog.component.css']
})
export class EventDescriptionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  editEvent() : void {

    this.dialogRef.close();
  }

}
