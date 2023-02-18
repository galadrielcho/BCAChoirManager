import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventData} from '../../models/event-data.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventURL = 'api/event/'
  private calendarService : any;

  constructor(private http: HttpClient) { }

  setCalendarService(calendarService : any){
    this.calendarService = calendarService;
  }

  getAllEvents() {
    return this.http.get<any>('/api/event/get-all-events/');
  }

  getEventsInRange(startDate : Date, endDate: Date){
    return this.http.get<any>(`/api/event/get-events-in-range/${startDate.getTime()}/${endDate.getTime()}/`);

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

  dateISOToLocale(iso : string){
    return new Date(iso).toLocaleString('en-us');
  }

  editEvent(origEvent : EventData, newEvent : EventData){
    let events = {
      orig_event : origEvent,
      new_event : newEvent
    }
    return this.http.post<any>('/api/event/event-edit/', events).subscribe();
  }

  createEvent(event : EventData){
    return this.http.post<any>('/api/event/event-create', event).subscribe();
  }

}
