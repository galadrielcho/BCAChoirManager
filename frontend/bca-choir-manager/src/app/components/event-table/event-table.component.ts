import { ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event-service/event.service';
import { EventData } from 'src/app/models/event-data.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { EventDeleteDialogComponent } from '../event-delete-dialog/event-delete-dialog.component';
import { EventRegistreesDialogComponent } from '../event-dialog-with-registrees/event-dialog-with-registrees.component';
import { EventEditDialogComponent } from '../event-edit-dialog/event-edit-dialog.component';
import { ErrorService } from 'src/app/services/error-service/error.service';


@Component({

  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css'],
  animations: []
})

export class EventTableComponent {
  generatedColumns = ['start_time', 'end_time', 'registration_status'];

  allColumns = ['event_name', 'choir_type', 'start_time', 'registration_status', 'open-event', 'delete'];
  tableHeader = ['event_name', 'choir_type', 'start_time', 'registration_status'];


  
  private events : EventData[] = [];
  private origEvent : EventData[] = [];
  dataSource: MatTableDataSource<EventData> = new MatTableDataSource<EventData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  eventService: EventService;

  constructor(private es: EventService,
              public dialogRef: MatDialogRef<EventDeleteDialogComponent>,
              public dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef,
              private errorService : ErrorService
    ) { 
    this.eventService = es;
    this.eventService.getAllEvents().subscribe({
      next: events => {
        this.events = events;
        this.setupTable();

      },
      error: error=>{
        this.errorService.showErrorDialog(`Could not get events from database`);

      }      
    }); 
    

  }

  ngAfterViewInit(): void {
  }

  setupTable() {
    this.dataSource = new MatTableDataSource(this.events);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    if (this.dataSource) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  } 


  openDeleteEventDialog(event : EventData): void {
    const dialogRef = this.dialog.open(EventDeleteDialogComponent, {
      width: '300px',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let index = this.events.indexOf(event);
        this.events.splice(index, 1);
        this.refresh();
      }
    });
  }

  convertTimeUserFriendly(d : string) : string{
    return this.es.dateISOToLocale(d).replace(":00 ", " ");

  }

  convertRegStatusUserFriendly(e : EventData) : string {
    return (e.registration_status == 1) ? "Open" : "Closed";
  }

  openEventRegistrees(event : EventData): void {
    const dialogRef = this.dialog.open(EventRegistreesDialogComponent, {
      data: event
      });

    dialogRef.afterClosed().subscribe((ref : MatDialogRef<EventEditDialogComponent>) => {
      ref.afterClosed().subscribe(updatedStudent => {
        this.eventService.getAllEvents().subscribe({
          next: (events : EventData[]) => {
            for(let event in  events){
              events[event].start_time = this.es.dateISOToLocale(events[event].start_time);
              events[event].end_time = this.es.dateISOToLocale(events[event].end_time);
              events[event].registration_status = (events[event].registration_status == 1) ? "Open" : "Closed";
  
            }
            
            this.events = events;
            this.refresh();
          },
          error: error=>{
            this.errorService.showErrorDialog(`Could not get events from database`);
    
          }      
        }
        );
      });
    });
  }

  openCreateEventDialog() : void {
    const dialogRef = this.dialog.open(EventEditDialogComponent, {
      width: '450px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
              // TO DO : Check if the event has been updated and only update that event
        this.eventService.getAllEvents().subscribe({
          
          next: (events : EventData[]) => {
            for(let event in  events){
              events[event].start_time = this.es.dateISOToLocale(events[event].start_time).replace(":00 ", " ");
              events[event].end_time = this.es.dateISOToLocale(events[event].end_time).replace(":00 ", " ");
              events[event].registration_status = (events[event].registration_status == 1) ? "Open" : "Closed";
    
            }
            this.events = events;
            this.refresh();
          },
          error: error=>{
            this.errorService.showErrorDialog(`Could not get events from database`);
    
          }  
      });
  
      }
    });
  }

  getColumnHead(column : string) : string {
    column = column.split("_")[0];

    return column.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      }
    );

  }


  refresh() {
    this.setupTable();
    this.changeDetectorRefs.detectChanges();
  }

}
