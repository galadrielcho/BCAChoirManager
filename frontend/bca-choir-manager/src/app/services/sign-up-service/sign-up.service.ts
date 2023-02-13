import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  dialog!: MatDialog;
  location!: Location;

  constructor() { }

  public send(dialog: MatDialog, location: Location){
    this.dialog = dialog;
    this.location = location;
  }

  public close(){
    this.dialog.closeAll();
    this.location.reload();
  }
}
