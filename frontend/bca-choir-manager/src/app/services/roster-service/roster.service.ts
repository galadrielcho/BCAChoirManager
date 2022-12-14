import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RosterService {
  private rosterUrl = '/api/roster';

  constructor(private http: HttpClient) { }

  getStatus() {
    return this.http.get<any>(this.rosterUrl);
  }


}
