import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-notification-component',
  templateUrl: './generic-notification.component.html',
  styleUrls: ['./generic-notification.component.css']
})
export class GenericNotificationComponent {
  constructor(
    public dialogRef: MatDialogRef<GenericNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialog: MatDialog
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
