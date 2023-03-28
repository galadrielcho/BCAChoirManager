import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // user_email : string; 
  user : any;
  admin: boolean;
  seconds: number;

  constructor(private http: HttpClient, private auth : AuthService) {
    this.admin = false;
    this.seconds = 0;
  }
  
  //resolve({status: true});
  callApi(apiObject : string){
    return new Promise<Boolean>((resolve, reject) => {
      this.http.get<any>(apiObject).subscribe({
        next: data =>{
          if(data.details != undefined){
            if(data.details.is_admin.data[0] == 0){
              resolve(false);
            }
            else{
              resolve(true);
            }
          }
          else{
            resolve(false);
          }
          this.seconds = Date.now()/1000;
        },
        error: err =>{
          this.seconds = Date.now()/1000;
          reject(err);
        }
      });
    });
  }

  login() {
    this.auth.loginWithPopup();
  }
  logout() {
    this.user = null;
  }

  getUser() {
    return this.auth.user$;
  }

  getAdmins(){
    let url = `/api/get-admins`;
    return this.http.get<any>(url);
  }


  isAdmin2(email : string | undefined) {
    let url = `/api/is-admin/${email}`;
    console.log(url);
    return this.http.get<any>(url);
  }

  async isAdmin(email : string|undefined){
    // auth.user$ | async as user
    let url = `/api/get-account/${email}`;
    return await this.callApi(url);
   
  }
  
 
}
