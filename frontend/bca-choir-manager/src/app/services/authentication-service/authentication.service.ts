import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // user_email : string; 
  
  private user : any = null;
  private admin: boolean = false;

  constructor(private http: HttpClient, private auth : AuthService) {}
  login() {
    this.auth.loginWithRedirect({
      appState: { target: 'callback' }
    });
  }

  postLogin() {
    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe(
        data => {
          this.user = data;
          if (data) {
            this.isAdmin(data.email).subscribe(
              data => {
                this.admin = data;
            });
          }
        }
      );
    }
  }

  logout() {
    this.user = null;
    this.admin = false;
    this.auth.logout({ returnTo: "" })

  }

  getUser() {
    return this.user.email;
  }

  getAdmins(){
    let url = `/api/get-admins`;
    return this.http.get<any>(url);
  }

  isAdmin(email : string|undefined){
    let url = `/api/is-admin/${email}`;
    console.log(url);
    return this.http.get<boolean>(url);
  }

  getUserAdmin() {
    return this.admin;
  }
  

  isAuthenticated() {
    if (this.user) {
      return true;
    } else {
      return false;
    }  
  }

  getEmailTag() {
    return this.user.email.split("@")[0];
  }
 
}
