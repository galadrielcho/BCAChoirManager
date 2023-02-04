import { AfterViewInit, Component, ElementRef, ViewChild , Renderer2} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
// import { EventTableDataSource, EventTableItem } from './event-table-datasource';
import {MatDialog,} from '@angular/material/dialog';
import { EventService } from 'src/app/services/event-service/event.service';
import { EventData } from 'src/app/models/event-data.model';
@Component({

  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css']
})

export class EventTableComponent {
  displayedColumns = ['event_name', 'type', 'start_time', 'end_time', 'expand'];
  private events : EventData[] = [];
  dataSource: MatTableDataSource<EventData> = new MatTableDataSource<EventData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  eventService: EventService;

  constructor(private es: EventService, private md: MatDialog) { 
    this.eventService = es;
    this.eventService.getEvents().subscribe({
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

  expandEvent(event_name: string, start_time: string){


  }

  applyFilter(event: Event) {
    if (this.dataSource) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

}
