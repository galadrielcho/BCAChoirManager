import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EventData } from '../../models/event-data.model'
import {FormControl} from '@angular/forms';


@Component({
  selector: 'event-edit-dialog',
  templateUrl: './event-edit-dialog.component.html',
  styleUrls: ['./event-edit-dialog.component.css']
})

export class EventEditDialogComponent {
  myControl = new FormControl('');
  choirTypes : string[] = ['Chamber', 'Concert'];
  eventAction : string;
  
  constructor(
    public dialogRef: MatDialogRef<EventEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventData
    ) {
      if (data == null) {
        this.eventAction = "Create";
      } else {
        this.eventAction = "Edit";
      }

    }


  onNoClick(): void {
    this.dialogRef.close();
  }

  createEvent(): void {
    this.dialogRef.close();
  }

}
