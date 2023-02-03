import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RosterUpdateService {
  private rosterUrl = '/api/roster-update';
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),//primary key to identify each student
    first_name: new FormControl(' ', Validators.required),
    last_name: new FormControl(' ', Validators.required),
    pronouns: new FormControl(' ', Validators.required),
    voicepart: new FormControl(' ', Validators.required),
    number: new FormControl(' ', Validators.required),
    one: new FormControl(' '),
    two: new FormControl(' '),
    choirtype: new FormControl(' ', Validators.required),
    concert: new FormControl(' '),
    chamber: new FormControl(' '),
    grad_year: new FormControl(' ', Validators.required)
  });

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


}
