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
  myControl = new FormControl('');
  public newStartTime : string = this.getStartTime();
  public newEndTime : string = this.getEndTime();

  
  choirTypes : string[] = ['Chamber', 'Concert'];
  eventAction : string;
  public new_event : EventData = {
    start_time: this.orig_event.start_time,
    end_time: this.orig_event.end_time,
    location: this.orig_event.location,
    address: this.orig_event.address,
    event_name: this.orig_event.event_name,
    choir_type: this.orig_event.choir_type
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

  getEventName(){
    return this.orig_event == null? "" : this.orig_event.event_name;
  }

  getLocation(){
    return this.orig_event == null? "" : this.orig_event.location;
  }

  getAddress(){
    return this.orig_event == null? "" : this.orig_event.address;
  }

  getStartDate(){
    return this.orig_event == null? new Date() : new Date(this.orig_event.start_time);
  }

  getEndDate(){
    return this.orig_event == null? new Date() : new Date(this.orig_event.end_time);
  }

  getEndTime(){
    if (this.orig_event != null){
      const date = new Date(this.orig_event.end_time);
      return date.toLocaleTimeString(['en-us'], {hourCycle: 'h23', hour: "2-digit", minute: "2-digit"});
    }
    else{
      return "00:00";
    }
  }

  getStartTime(){
    if (this.orig_event != null){
      const date = new Date(this.orig_event.start_time);
      const starttime= date.toLocaleTimeString(['en-us'], { hourCycle: 'h23', hour: "2-digit", minute: "2-digit"});
      return starttime;
    }
    else{
      return "00:00";
    }
  }

  isChoirType(choirType : string){
    return choirType == this.orig_event.choir_type;
  }

  updateEvent(){

    const endTimes = this.newEndTime.split(":");
    const startTimes = this.newStartTime.split(":");

    this.eventService.editEvent(this.orig_event, this.new_event);
    this.dialogRef.close();
    this.calendarService.loadCalendarEvents();

  }
}
