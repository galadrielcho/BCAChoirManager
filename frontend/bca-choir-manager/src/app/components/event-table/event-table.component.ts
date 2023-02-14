import { Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {  MatTableDataSource } from '@angular/material/table';
// import { EventTableDataSource, EventTableItem } from './event-table-datasource';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event-service/event.service';
import { EventData } from 'src/app/models/event-data.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { EventDeleteDialogComponent } from '../event-delete-dialog/event-delete-dialog.component';
import { EventRegistreesDialogComponent } from '../event-registrees-dialog/event-registrees-dialog.component';


@Component({

  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class EventTableComponent {
  displayedColumns = ['event_name', 'choir_type', 'start_time', 'end_time'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedEvent : EventData | null = null;
  
  private events : EventData[] = [];
  dataSource: MatTableDataSource<EventData> = new MatTableDataSource<EventData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  eventService: EventService;

  constructor(private es: EventService,
              public dialogRef: MatDialogRef<EventDeleteDialogComponent>,
              public dialog: MatDialog
    
    ) { 
    this.eventService = es;
    this.eventService.getAllEvents().subscribe({
      next: data => {
        this.events = data.events;
        this.setupTable();

      }      
    }); 
    

  }

  ngAfterViewInit(): void {
  }

  setupTable() {
    this.dataSource = new MatTableDataSource(this.events);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    console.log(this.dataSource.data);

  }

  expandEvent(event : EventData | null){
    console.log(event);
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
        window.location.reload();

      }
    });
  }

  openEventRegistrees(event : EventData): void {
    const dialogRef = this.dialog.open(EventRegistreesDialogComponent, {
      width: '500',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Done");
    });
  }


}
