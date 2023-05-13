import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { User as Auth0User } from '@auth0/auth0-spa-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // user_email : string; 
  
  private authUser : any = null;
  private chamber: boolean = false;
  private concert: boolean = false;
  private account: any = null;
  private admin : boolean = false;
  private accessToken : string | null = null;

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

            this.setAccountDetails();
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
    this.refreshAccessToken().subscribe(
      (token: string) => {
        this.setAccessToken(token);
        let url = `/api/get-account/${this.getUserEmail()}`;
        this.http.get<any>(url).subscribe(
          account =>{
            if (Object.keys(account).length > 0){
              this.account = account;
    
              if (this.account.details.is_admin.data[0] == 0) {
                this.setStudentDetails();
              } else {
                this.admin = true;
              }
            }
          }
        );                
      }
    )
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

  refreshAccessToken() {
    return this.auth.getAccessTokenSilently();
  }

  setAccessToken(token : string | null) {
    this.accessToken = token;
  }

  getAccessToken() {
    return this.accessToken;
  }

  hasAccessToken() {
    return this.accessToken != null;
  }
 
}
