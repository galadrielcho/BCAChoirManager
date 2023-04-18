import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EventData } from 'src/app/models/event-data.model';
import { EventRegistree } from 'src/app/models/event-registree.model';
import { EventService } from 'src/app/services/event-service/event.service';

@Component({
  selector: 'app-event-registrees-dialog',
  templateUrl: './event-registrees-dialog.component.html',
  styleUrls: ['./event-registrees-dialog.component.css']
})
export class EventRegistreesDialogComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EventRegistree>;
  dataSource: MatTableDataSource<EventRegistree> = new MatTableDataSource<EventRegistree>([]);

  private registrees : EventRegistree[] = [];
  private editModeOn : boolean = false;

  dataColumns = ['first_name', 'last_name', 'voicepart'];
  allColumns = [...this.dataColumns, 'delete'];

  constructor(
    public dialogRef: MatDialogRef<EventRegistreesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public event: EventData,
    public dialog: MatDialog,
    private eventService : EventService,

  ) {
    this.eventService.getEventRegistrees(event).subscribe({
      next: data => {
        this.registrees = data.registrees;
        this.dataSource = new MatTableDataSource(this.registrees);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;   
      }      
    }); 


  }

  ngOnInit(): void {
  };


  close(): void {
    this.dialogRef.close();
  }

  editMode() : void {
    this.editModeOn = true;
  }

  deleteClicked(email: string){
    this.eventService.deleteStudentFromEvent(email, this.event);
    location.reload();
  }


}
