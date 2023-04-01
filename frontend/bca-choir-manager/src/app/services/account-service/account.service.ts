import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private statusUrl = '/api/account';

  constructor(private http: HttpClient) { }

  postStatus(stringArray: string[]) {
    return this.http.post(this.statusUrl, stringArray);
  }

  checkAdmin(details: string[]){
    console.log("checking");
    return this.http.post('/api/check-admin', details);
  }

  addAdmin(details: string[]){
    return this.http.post('/api/add-admin', details);
  }
  
}
