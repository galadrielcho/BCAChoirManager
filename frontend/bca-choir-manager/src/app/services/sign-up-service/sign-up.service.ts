import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  dialog!: MatDialog;
  location!: Location;

  constructor(private http: HttpClient) { }

  public send(dialog: MatDialog, location: Location){
    this.dialog = dialog;
    this.location = location;
  }

  public close(){
    this.dialog.closeAll();
    this.location.reload();
  }

  public getEmail(email : string|undefined){
    let url = `/api/get-student/${email}`;
    return this.http.get<any>(url);
  }

}
