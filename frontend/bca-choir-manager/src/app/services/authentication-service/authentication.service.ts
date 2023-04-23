import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { EventSignupDialogComponent } from 'src/app/components/event-signup-dialog/event-signup-dialog.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { User as Auth0User } from '@auth0/auth0-spa-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // user_email : string; 
  
  private authUser : any = null;
  private admin: boolean = false;
  private chamber: boolean = false;
  private concert: boolean = false;
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
            const roles = this.authUser['http://localhost:4200/roles'];
            if (roles && roles.includes('admin')) {
              this.admin = true;
            }
            else if (roles && roles.includes('chamber')) {
              this.chamber = true;
            }
            else if (roles && roles.includes('concert')) {
              this.concert = true;
            }


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
      ) as Auth0User;
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

  isAdmin() {
    return this.admin;
  }
  isConcert() {
    return this.concert;
  }
  isChamber() {
    return this.chamber;
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
