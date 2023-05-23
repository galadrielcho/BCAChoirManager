import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ErrorService } from '../error-service/error.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private statusUrl = '/api/account';

  constructor(private http: HttpClient, private errorService : ErrorService) { }

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
    this.http.get<any>('/api/delete-old-accounts').subscribe(
      {              
        error: error =>{
        this.errorService.showErrorDialog(`Failed to delete records from database.`);
      }}
    );
  }
  
}
