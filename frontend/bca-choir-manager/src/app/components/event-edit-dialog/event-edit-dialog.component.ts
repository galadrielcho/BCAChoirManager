import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EventData } from '../../models/event-data.model'

@Component({
  selector: 'event-edit-dialog',
  templateUrl: './event-edit-dialog.component.html',
  styleUrls: ['./event-edit-dialog.component.css']
})

export class EventEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
