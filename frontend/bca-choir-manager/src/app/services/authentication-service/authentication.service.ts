import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  admin: boolean;
  seconds: number;

  constructor(private http: HttpClient) {
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

  async isAdmin(email : string|undefined){
    let url = `/api/get-account/${email}`;
    return await this.callApi(url);
   
  }
  
 
}
