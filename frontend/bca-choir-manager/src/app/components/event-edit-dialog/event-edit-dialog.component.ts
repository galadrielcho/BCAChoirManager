import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EventData } from '../../models/event-data.model'
import {FormControl} from '@angular/forms';
import {EventService} from '../../services/event-service/event.service'

@Component({
  selector: 'event-edit-dialog',
  templateUrl: './event-edit-dialog.component.html',
  styleUrls: ['./event-edit-dialog.component.css']
})

export class EventEditDialogComponent {
  myControl = new FormControl('');
  choirTypes : string[] = ['Chamber', 'Concert'];
  eventAction : string;
  
  constructor(
    public dialogRef: MatDialogRef<EventEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public event: EventData,
    private eventService : EventService
    ) {
      if (event == null) {
        this.eventAction = "Create";
      } else {
        this.eventAction = "Edit";
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editEvent() : void{
    console.log(this.event);
    
  }

  createEvent(): void {
    this.dialogRef.close();
  }

  getEventName(){
    return this.event == null? "" : this.event.event_name;
  }

  getLocation(){
    return this.event == null? "" : this.event.location;
  }

  getAddress(){
    return this.event == null? "" : this.event.address;
  }

  getStartDate(){
    return this.event == null? new Date() : new Date(this.event.start_time);
  }

  getEndDate(){
    return this.event == null? new Date() : new Date(this.event.end_time);
  }

  getEndTime(){
    if (this.event != null){
      const date = new Date(this.event.end_time);
      return date.toLocaleTimeString(['en-us'], {hourCycle: 'h23', hour: "2-digit", minute: "2-digit"});
    }
    else{
      return undefined;
    }
  }

  getStartTime(){
    if (this.event != null){
      const date = new Date(this.event.start_time);
      const starttime= date.toLocaleTimeString(['en-us'], { hourCycle: 'h23', hour: "2-digit", minute: "2-digit"});
      return starttime;
    }
    else{
      return undefined;
    }
  }

  isChoirType(choirType : string){
    console.log("CHoir type! " + choirType);
    console.log("This.event. choir ttype " + this.event.choir_type);
    return choirType == this.event.choir_type;
  }
}
