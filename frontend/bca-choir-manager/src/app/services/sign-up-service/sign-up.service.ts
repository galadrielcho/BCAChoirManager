import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentData } from 'src/app/models/student-data.model';
import { AuthenticationService } from '../authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  dialog!: MatDialog;
  location!: Location;
  email!: string;
  private signUpUrl = '/api/sign-up';

  constructor(private http: HttpClient,
              private authService: AuthenticationService) { }

  public send(dialog: MatDialog, location: Location, email: string|undefined){
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
  }

  public postDetails(student: any[]){
    this.http.post(this.signUpUrl, student).subscribe();
  }

  public getEmail(email : string|undefined){
    let url = `/api/get-account/${email}`;
    return this.http.get<any>(url);
  }

}
