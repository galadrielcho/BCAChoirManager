import { Component } from '@angular/core';
import { CalendarService} from '../../services/calendar-service/calendar.service';
import { EventData} from '../../models/event-data.model';

@Component({
  selector: 'app-calendar-upcoming-events',
  templateUrl: './calendar-upcoming-events.component.html',
  styleUrls: ['./calendar-upcoming-events.component.css']
})
export class CalendarUpcomingEventsComponent {
  
  public events : EventData[]= []; 

  constructor(private cs: CalendarService) { 
    this.events = []    
    cs.getEvents().subscribe({
      next: data => {

        for(let i = 0; i < data.events.length; i++){
          
          this.events.push({event_name: data.events[i][0], 
                      start_time: data.events[i][1],
                      end_time: data.events[i][2],
                      location: data.events[i][3],
                      address: data.events[i][4]
                      }
          );
        } 
      }      
    }); 
  }

}
