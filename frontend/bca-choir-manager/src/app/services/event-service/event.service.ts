import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventData} from '../../models/event-data.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventURL = 'api/events/'
  private calendarService : any;

  constructor(private http: HttpClient) { }

  setCalendarService(calendarService : any){
    this.calendarService = calendarService;
  }

  getAllEvents() {
    return this.http.get<any>('/api/events/get-all-events/');
  }

  getEventsInRange(startDate : Date, endDate: Date){
    return this.http.get<any>(`/api/events/get-events-in-range/${startDate.getTime()}/${endDate.getTime()}/`);

  }
  
  deleteEvent(e : EventData){
    console.log(e);
    const startTime = new Date(e.start_time).getTime();
    const endTime = new Date(e.end_time).getTime();

    const obs = this.http.delete(
      this.eventURL + `${e.event_name}/${startTime}/${endTime}/`).subscribe();
    this.calendarService.loadCalendarEvents();
    return obs;
  }
}
