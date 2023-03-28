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

  addAdmin(details: string[]){
    console.log(details);
  }
}
