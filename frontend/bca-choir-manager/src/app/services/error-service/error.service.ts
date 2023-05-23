import { Injectable } from '@angular/core';
import { HttpErrorDialogComponent } from 'src/app/components/http-error-dialog/http-error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(public dialog: MatDialog) { }

  showErrorDialog(error : any) {
    const httpErrorDialog = this.dialog.open(HttpErrorDialogComponent, {
      width: '500px',
      data: error
    });
  }
}
