import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  admin: boolean;

  constructor(private http: HttpClient) {
    this.admin = false;
  }
  
  //resolve({status: true});
  callApi(apiObject : string){
    return new Promise((resolve, reject) => {
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
        },
        error: err =>{
          reject(err);
        }
      });
    });
  }

  async isAdmin(email : string|undefined){
    let url = `/api/get-account/${email}`;
    return await this.callApi(url);
    
    /*
    this.http.get<any>(url).subscribe({
      next: data => {         // LOOK INTO OTHER EVENTS THAT ARE NOT NEXT
        if(data.details != undefined){
          console.log(data.details.is_admin.data[0]);
          if(data.details.is_admin.data[0] == 0){
            console.log("false 1");
            return false;
          }
          else{
            console.log("true 1");
            return true;
          }
        }
        else{
          console.log("false 2");
          return false;
        }
      }      
    }); 
    //HOW TO FORCE IT TO WAIT
    */
    
  }
  
 
}
