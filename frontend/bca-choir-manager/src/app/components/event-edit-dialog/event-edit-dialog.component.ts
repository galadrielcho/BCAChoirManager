import { Component, Inject, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EventData } from '../../models/event-data.model'
import { FormGroup, FormControl } from '@angular/forms';
import {EventService} from '../../services/event-service/event.service'
import {CalendarService} from '../../services/calendar-service/calendar.service'
import { Validators } from '@angular/forms';
import { Token } from '@angular/compiler';

@Component({
  selector: 'event-edit-dialog',
  templateUrl: './event-edit-dialog.component.html',
  styleUrls: ['./event-edit-dialog.component.css']
})

export class EventEditDialogComponent {

  public eventForm : FormGroup = new FormGroup({
    start_time: new FormControl(this.getStartTime(), 
                              [Validators.required]),
    end_time: new FormControl(this.getEndTime()),
    start_date: new FormControl(new Date().toString(), 
                              [Validators.required]),
    end_date: new FormControl(''),
    location : new FormControl('',
                            [Validators.pattern('[a-zA-Z -/0-9]*')]),
    address : new FormControl('', 
                            [Validators.pattern('[a-zA-Z -/0-9,.:]*')]),
    event_name : new FormControl('', 
                              [Validators.required,
                              Validators.pattern('[a-zA-Z -/0-9,.:]*'),
                              Validators.maxLength(25)]),
    choirtype : new FormControl('Chamber',
                              [Validators.required])});


  choirTypes : string[] = ['Chamber', 'Concert'];
  eventAction : string;

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
        console.log(this.orig_event);
        this.eventForm.patchValue({
          start_date: this.orig_event.start_time,
          end_date: this.orig_event.end_time,
          location: this.orig_event.location,
          address: this.orig_event.address,
          event_name: this.orig_event.event_name,
          choirtype: this.orig_event.choir_type
        });
      }
      else {
        const startTime = new Date();
        startTime.setHours(0, 0, 0, 0);
        const endTime = new Date();
        endTime.setHours(11, 59, 0, 0);

        this.eventForm.patchValue({
          start_date : startTime.toISOString(),
          end_date : endTime.toISOString(),
          location : "",
          address: "",
          event_name : "",
          choirtype : "Concert"
        });
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
    return choirType == this.eventForm.value.choir_type;
  }

  updateEvent(){
    const endTimes = this.eventForm.value.end_time.split(":");
    const startTimes = this.eventForm.value.start_time.split(":");
    let startDate = new Date(this.eventForm.value.start_date)
    startDate.setHours(Number(startTimes[0]), Number(startTimes[1]), 0);
    let endDate = new Date(this.eventForm.value.end_date)
    endDate.setHours(Number(endTimes[0]), Number(endTimes[1]), 0);

    let new_event = {
      start_time : startDate.toString(),
      end_time : endDate.toString(),
      location  : this.eventForm.value.location,
      address : this.eventForm.value.address,
      event_name : this.eventForm.value.event_name,
      choir_type : this.eventForm.value.choirtype
    }

    if (this.eventAction == "Edit"){
      this.eventService.editEvent(this.orig_event, new_event);
      this.dialogRef.close(false);
    }  
    else {
      this.eventService.createEvent(new_event);
      this.dialogRef.close(true);
    }
    this.calendarService.loadCalendarEvents();

  }
}
