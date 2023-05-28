import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EventData } from 'src/app/models/event-data.model';
import { EventRegistree } from 'src/app/models/event-registree.model';
import { EventService } from 'src/app/services/event-service/event.service';
import { ErrorService } from 'src/app/services/error-service/error.service';
import { EventEditDialogComponent } from '../event-edit-dialog/event-edit-dialog.component';

@Component({
  selector: 'app-event-registrees-dialog',
  templateUrl: './event-dialog-with-registrees.component.html',
  styleUrls: ['./event-dialog-with-registrees.component.css']
})
export class EventRegistreesDialogComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EventRegistree>;
  dataSource: MatTableDataSource<EventRegistree> = new MatTableDataSource<EventRegistree>([]);

  private registrees : EventRegistree[] = [];
  eventStart : string;
  eventEnd : string;

  dataColumns = ['first_name', 'last_name', 'voicepart'];
  allColumns = [...this.dataColumns, 'delete'];

  constructor(
    public dialogRef: MatDialogRef<EventRegistreesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public event: EventData,
    public dialog: MatDialog,
    private eventService : EventService,
    private errorService : ErrorService

  ) {
    this.event.start_time = new Date(this.event.start_time).toISOString();
    this.event.end_time = new Date(this.event.end_time).toISOString();

    console.log(this.event);
    const timeFormat : Intl.DateTimeFormatOptions= {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour12: true,
      hour: 'numeric'
    };
  
    this.eventStart = new Date(event.start_time).toLocaleString('en-US', timeFormat);
    this.eventEnd = new Date(event.start_time).toLocaleDateString('en-US',timeFormat);

    this.eventService.getEventRegistrees(this.event).subscribe({
      next: data => {
        this.registrees = data.registrees;
        this.dataSource = new MatTableDataSource(this.registrees);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;   
      },
      error: error=>{
        this.errorService.showErrorDialog(`Could not retrieve event registrees for ${this.event} from database.`);
      }
      }
    ); 


  }

  ngOnInit(): void {
  };


  close(): void {
    this.dialogRef.close();
  }

  deleteClicked(email: string){
    this.eventService.deleteStudentFromEvent(email, this.event)      
      .subscribe({
      error: error=>{
        this.errorService.showErrorDialog(`Could not add remove student ${email} from event ${this.event} in database.`);
      }
    });
    this.close();
  }

  editEvent() : void {
    let event_copy : EventData = {
      event_name : this.event.event_name,
      start_time : this.event.start_time,
      end_time : this.event.end_time,
      location : this.event.location,
      address : this.event.address,
      choir_type : this.event.choir_type,
      registration_status : this.event.registration_status
    }

    const dialogRef = this.dialog.open(EventEditDialogComponent, {
      width: '500px',
      data: event_copy
    });


    this.dialogRef.close(dialogRef);

  }
}
