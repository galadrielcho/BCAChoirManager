import { Component, Inject, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EventData } from '../../models/event-data.model'
import {FormControl} from '@angular/forms';
import {EventService} from '../../services/event-service/event.service'
import {CalendarService} from '../../services/calendar-service/calendar.service'

@Component({
  selector: 'event-edit-dialog',
  templateUrl: './event-edit-dialog.component.html',
  styleUrls: ['./event-edit-dialog.component.css']
})

export class EventEditDialogComponent {
  public newStartTime : string = this.getStartTime();
  public newEndTime : string = this.getEndTime();

  
  choirTypes : string[] = ['Chamber', 'Concert'];
  eventAction : string;
  public new_event : EventData = {
    start_time: new Date().toString(),
    end_time: new Date().toString(),
    location: "",
    address: "",
    event_name: "",
    choir_type: "Chamber",
  };


  constructor(
    public dialogRef: MatDialogRef<EventEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private orig_event: EventData,
    private eventService : EventService,
    private calendarService : CalendarService
    ) {
      if (orig_event == null) {
        this.eventAction = "Create";
      } else {
        this.eventAction = "Edit";
      }

      if (this.eventAction == "Edit"){
        this.new_event = {
          start_time: this.orig_event.start_time,
          end_time: this.orig_event.end_time,
          location: this.orig_event.location,
          address: this.orig_event.address,
          event_name: this.orig_event.event_name,
          choir_type: this.orig_event.choir_type
        }
      }
      else {
        const startTime = new Date();
        startTime.setHours(0, 0, 0, 0);
        const endTime = new Date();
        endTime.setHours(11, 59, 0, 0);

        this.new_event = {
          start_time : startTime.toISOString(),
          end_time : endTime.toISOString(),
          location : "",
          address: "",
          event_name : "",
          choir_type : "Chamber"
        }
      }
      this.newStartTime = this.getStartTime();
      this.newEndTime = this.getEndTime();

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editEvent() : void{
    console.log(this.orig_event);
    
  }

  createEvent(): void {
    this.dialogRef.close();
  }

  getEndTime(){
    if (this.eventAction == "Edit"){
      const date = new Date(this.orig_event.end_time);
      return date.toLocaleTimeString(['en-us'], {hourCycle: 'h23', hour: "2-digit", minute: "2-digit"});
    }
    else{
      return "11:59";
    }
  }

  getStartTime(){
    if (this.eventAction == "Edit"){
      const date = new Date(this.orig_event.start_time);
      const starttime= date.toLocaleTimeString(['en-us'], { hourCycle: 'h23', hour: "2-digit", minute: "2-digit"});
      return starttime;
    }
    else{
      return "00:00";
    }
  }

  isChoirType(choirType : string){
    return choirType == this.new_event.choir_type;
  }

  updateEvent(){
    if (this.eventAction == "Edit"){
      const endTimes = this.newEndTime.split(":");
      const startTimes = this.newStartTime.split(":");


      let startDate = new Date(this.new_event.start_time)
      startDate.setHours(Number(startTimes[0]), Number(startTimes[1]), 0);
      this.new_event.start_time = startDate.toString();

      let endDate = new Date(this.new_event.end_time)
      endDate.setHours(Number(endTimes[0]), Number(endTimes[1]), 0);
      this.new_event.end_time = endDate.toString();

      this.eventService.editEvent(this.orig_event, this.new_event);
      this.dialogRef.close(false);
      this.calendarService.loadCalendarEvents();
    }  

    else {
      this.eventService.createEvent(this.new_event);
      this.dialogRef.close(true);
      this.calendarService.loadCalendarEvents();

    }
  }
}
