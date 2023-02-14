import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class RosterUpdateService {
  private rosterUrl = '/api/roster-update';

  email = "";
  details = "";
  dialog!: MatDialog;
  location!: Location;

  constructor(private http: HttpClient) { 
  }

  public setEmail(email: string){
    this.email = email;
  }

  public setDetails(detail: string){
    this.details = detail;
  }

  public getAccountDetails(email: string){
    let url = `/api/get-student/${email}`;
    return this.http.get<any>(url);
  }

  public updateDetails(updatedDetails: any[]){
    this.http.post(this.rosterUrl, updatedDetails).subscribe();
  }

  public send(dialog: MatDialog, location: Location){
    this.dialog = dialog;
    this.location = location;
  }

  public closeEdit(){
    this.dialog.closeAll();
    this.location.reload();
  }

}
