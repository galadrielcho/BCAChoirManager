import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';

import { AccountService } from 'src/app/services/account-service/account.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css']
})
export class DeleteAccountDialogComponent  {
  constructor(
    public dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialog: MatDialog, 
    private accountService : AccountService,
    private authenticationService : AuthenticationService,
    private location: Location
  ) {}

  close(): void {
    this.dialogRef.close();

  }

  deleteAccount() : void {
    let email = this.authenticationService.getUserEmail();

    this.accountService.deleteAdmin(email).subscribe();
    this.dialogRef.close(true);
    this.location.replaceState('/home');
    location.reload();

  }


  

}
