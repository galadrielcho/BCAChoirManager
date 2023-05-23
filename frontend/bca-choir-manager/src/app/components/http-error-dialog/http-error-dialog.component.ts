import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-http-error-dialog',
  templateUrl: './http-error-dialog.component.html',
  styleUrls: ['./http-error-dialog.component.css']
})
export class HttpErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<HttpErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialog: MatDialog
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
