import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  dialog!: MatDialog;
  location!: Location;
  email!: String;
  private signUpUrl = '/api/sign-up';

  constructor(private http: HttpClient) { }

  public send(dialog: MatDialog, location: Location, email: String|undefined){
    this.dialog = dialog;
    this.location = location;
    if(email == undefined){
      throw Error("invalid email");
    }
    else{
      this.email = email;
    }
  }

  public close(){
    this.dialog.closeAll();
    this.location.reload();
  }

  public postDetails(details: any[]){
    this.http.post(this.signUpUrl, details).subscribe();
  }

  public getEmail(email : string|undefined){
    let url = `/api/get-account/${email}`;
    return this.http.get<any>(url);
  }

}
