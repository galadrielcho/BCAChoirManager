import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { EventSignupDialogComponent } from 'src/app/components/event-signup-dialog/event-signup-dialog.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // user_email : string; 
  
  private authUser : any = null;
  private admin: boolean = false;
  private account: any = null;

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
            let url = `/api/get-account/${this.authUser.email}`;
            this.http.get<any>(url).subscribe(
              account =>{
                if (account){
                  this.account = account;
                }
                else {
                  this.account = {
                    first_name: null,
                    last_name: null,
                    email: this.authUser.email,
                    is_admin: false,
                    pronouns: null
                  }

                  let dialogRef = this.dialog.open(EventSignupDialogComponent, {
                    width: '300px'                  });
                }
              }
            );            
          }

        }
      );
    }
  }

  logout() {
    this.authUser = null;
    this.admin = false;
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
      return this.account.details.is_admin;
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
 
}
