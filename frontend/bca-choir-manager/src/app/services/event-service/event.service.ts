import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private getEventsUrl = '/api/getEvents';

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this.getEventsUrl);
  }

  
}
