import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // user_email : string; 
  
  private authUser : any = null;
  private account: any = null;
  private admin : boolean = false;

  constructor(private http: HttpClient, 
              private auth : AuthService,
              private dialog: MatDialog) {}
  login() {
    this.auth.loginWithRedirect({
      appState: { target: 'callback' }
    });
  }

  postLogin() {
    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe(
        data => {
          this.authUser = data;
          if (data){
            this.setAccountDetails();
          }

        }
      );
    }
  }

  logout() {
    this.authUser = null;
    this.account.is_admin = false;
    this.auth.logout({ returnTo: "" })

  }

  getUserEmail() {
    return this.authUser.email;
  }

  getAdmins(){
    let url = `/api/get-admins`;
    return this.http.get<any>(url);
  }

  isAdmin(email : string|undefined){
    let url = `/api/is-admin/${email}`;
    return this.http.get<boolean>(url);
  }

  getUserAdmin() {
    if (this.account !== null && this.account !== undefined){
      return this.account.details.is_admin || false;
    }
    else {
      return false;
    }
  }
  

  isAuthenticated() {
    if (this.authUser) {
      return true;
    } else {
      return false;
    }  
  }

  getEmailTag() {
    return this.authUser.email.split("@")[0];
  }

  setAccountDetails() {
    console.log("Setting acccount");

    let url = `/api/get-account/${this.getUserEmail()}`;
    this.http.get<any>(url).subscribe(
      account =>{
        if (Object.keys(account).length > 0){
          this.account = account;
          console.log(this.account);
          if (!this.account.is_admin) {
            this.setStudentDetails();
          } else {
            console.log("Admin correctly registered");
            this.admin = true;
          }
        }
      }
    );            
  }

  setStudentDetails() {
    let url = `/api/get-student/${this.getUserEmail()}`;
    this.http.get<any>(url).subscribe(
      student =>{
        if (Object.keys(student).length > 1){
          this.account = student;
        }
      }
    );            

  }

 
}
