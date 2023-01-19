import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventService {
  private calendarURL = '/api/get-calendar-events/';

  constructor(private http: HttpClient) { }

  getEvents(month: number, year: number) {
    let url = `${this.calendarURL}/month=${month}year=${year}`; 
    return this.http.get<any>(url);
  }

}
