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
    const startTime = new Date(e.start_time).getTime();
    console.log(this.eventURL + `${e.event_name}/${startTime}/`);
    const obs = this.http.delete(
      this.eventURL + `${e.event_name}/${startTime}/`).subscribe();
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

  addStudentToEvent(studentEmail : string, event : EventData, voicepartNumber : number, voicepartName : string){
    
    let data = {
      student_email : studentEmail,
      event : event,
      voicepart_number: voicepartNumber,
      voicepart_name : voicepartName
    }

    return this.http.post<any>('/api/event/add-student-to-event/', data).subscribe();
  }

  checkStudentInEvent(studentEmail : string, event : EventData){
    let data = {
      student_email : studentEmail, 
      event : event
    }
    return this.http.post<any>('/api/event/check-student-in-event/', data);

  }

  deleteStudentFromEvent(studentEmail : string, event: EventData){
    let data = {
      student_email : studentEmail,
      event : event
    }
    return this.http.post<any>('/api/event/delete-student-from-event/', data).subscribe();

  }

  createEvent(event : EventData){
    return this.http.post<any>('/api/event/event-create', event).subscribe();
  }

  getEventRegistrees(event : EventData){
    return this.http.get<any>(`/api/event/get-event-registrees/${event.event_name}/${event.start_time}/`);
  }


}
