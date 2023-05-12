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
    return this.http.post('/api/check-admin', details);
  }

  addAdmin(details: string[]){
    return this.http.post('/api/add-admin', details);
  }

  deleteAdmin(email : string){
    return this.http.post<any>('/api/delete-account', [email]);
  }

  deleteRecords(){
    this.http.get<any>('/api/delete-old-accounts').subscribe();
  }
  
}
