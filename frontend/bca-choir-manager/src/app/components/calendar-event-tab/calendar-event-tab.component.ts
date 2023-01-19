import { Component, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventDescriptionDialogComponent } from '../event-description-dialog/event-description-dialog.component';
import { EventData } from 'src/app/models/event-data.model';

@Component({
  selector: 'calendar-event-tab',
  templateUrl: './calendar-event-tab.component.html',
  styleUrls: ['./calendar-event-tab.component.css']
})
export class CalendarEventTabComponent {
  @Input('event') event: EventData | null = null;
  
  constructor(public dialog: MatDialog) {}

  openEventDialog(): void {
    const dialogRef = this.dialog.open(EventDescriptionDialogComponent, {
      width: '500px',
      data: this.event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
