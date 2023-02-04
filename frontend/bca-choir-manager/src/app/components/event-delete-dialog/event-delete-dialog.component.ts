import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventData } from 'src/app/models/event-data.model';
import { EventDescriptionDialogComponent } from '../event-description-dialog/event-description-dialog.component';

@Component({
  selector: 'app-event-delete-dialog',
  templateUrl: './event-delete-dialog.component.html',
  styleUrls: ['./event-delete-dialog.component.css']
})
export class EventDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public event: EventData,
    public dialog: MatDialog,
  ) {}

  close(): void {
    this.dialogRef.close();
    this.openDescriptionEventDialog();

  }

  deleteEvent() : void {
    this.dialogRef.close();

  }

  openDescriptionEventDialog(): void {
    const describeEventDialogRef = this.dialog.open(EventDescriptionDialogComponent, {
      width: '500px',
      data: this.event
    });

    describeEventDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  

}
