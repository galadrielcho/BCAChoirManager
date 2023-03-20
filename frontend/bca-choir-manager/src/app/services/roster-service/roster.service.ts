import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RosterService {
  constructor(private http: HttpClient) { }

  getRoster() {
    return this.http.get<any>('/api/get-roster');
  }

  deleteAccount(email: string[]){
    return this.http.post('/api/delete-account', email).subscribe();
  }

}
