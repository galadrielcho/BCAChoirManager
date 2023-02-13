import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventEditDialogComponent } from '../event-edit-dialog/event-edit-dialog.component';
import { EventData } from 'src/app/models/event-data.model';
import { EventDeleteDialogComponent } from '../event-delete-dialog/event-delete-dialog.component';

@Component({
  selector: 'app-event-description-dialog',
  templateUrl: './event-description-dialog.component.html',
  styleUrls: ['./event-description-dialog.component.css']
})
export class EventDescriptionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public event: EventData,
    public dialog: MatDialog
  ) {}

  openDeleteEventDialog(): void {
    const dialogRef = this.dialog.open(EventDeleteDialogComponent, {
      width: '300px',
      data: this.event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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

  editEvent() : void {

    
    const dialogRef = this.dialog.open(EventEditDialogComponent, {
      width: '500px',
      data: this.event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
