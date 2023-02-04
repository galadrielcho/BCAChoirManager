import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RosterUpdateService {
  private rosterUrl = '/api/roster-update';

  email = "";
  details = "";

  constructor(private http: HttpClient) { 
  }

  public setEmail(email: string){
    this.email = email;
  }

  public setDetails(detail: string){
    this.details = detail;
  }

  public getAccountDetails(email: string){
    let url = `${this.rosterUrl}/${email}`;
    return this.http.get<any>(url);
  }

  public updateDetails(updatedDetails: any[]){
    this.http.post(this.rosterUrl, updatedDetails).subscribe();
  }

}
