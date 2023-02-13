import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RosterService {
  private rosterUrl = '/api/roster';

  constructor(private http: HttpClient) { }

  getRoster() {
    return this.http.get<any>(this.rosterUrl);
  }

  deleteAccount(email: string[]){
    return this.http.post(this.rosterUrl, email).subscribe();
  }

}
