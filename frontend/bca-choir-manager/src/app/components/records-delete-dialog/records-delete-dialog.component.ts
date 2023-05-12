import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account-service/account.service';

@Component({
  selector: 'app-records-delete-dialog',
  templateUrl: './records-delete-dialog.component.html',
  styleUrls: ['./records-delete-dialog.component.css']
})
export class RecordsDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RecordsDeleteDialogComponent>,
    public dialog: MatDialog,
    public service: AccountService
  ) {}
  close(): void {
    this.dialogRef.close();
  }

  deleteRecords() : void {
    this.service.deleteRecords();
    this.dialogRef.close();
  }
}
