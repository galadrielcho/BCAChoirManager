import { AfterViewInit, Component, ElementRef, ViewChild , Renderer2} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EventTableDataSource, EventTableItem } from './event-table-datasource';
import { RosterService} from '../../services/roster-service/roster.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { RosterUpdateComponent } from 'src/app/roster-update/roster-update.component';
import { EventService } from 'src/app/services/event-service/event.service';
@Component({

  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css']
})

export class EventTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EventTableItem>;
  dataSource: EventTableDataSource | undefined;
  eventService: EventService;
  dialog: MatDialog;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'type', 'start_time', 'end_time', 'expand'];
  
  expandEvent(name: string, start_time: string){


  }


  constructor(private es: EventService, private md: MatDialog) { 
    
    this.eventService = es;
    this.dialog = md;
    var events: EventTableItem[] = [];

    this.eventService.getEvents().subscribe({
      next: data => {

        for(let i = 0; i < data.events.length; i++){
          
          events.push({name: data.events[i][0], 
                      type: data.events[i][1],
                      start_time: data.events[i][2],
                      end_time: data.events[i][3]
          }
                      
          );
          
        }
        this.dataSource = new EventTableDataSource(events);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;   
      }      
    }); 
    
    
  
    
    
  }

  ngAfterViewInit(): void {
  }

}
