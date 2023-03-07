import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { RosterService} from '../../services/roster-service/roster.service';
import { MatDialog } from '@angular/material/dialog';
import { RosterUpdateComponent } from 'src/app/components/roster-update/roster-update.component';
import { RosterUpdateService } from 'src/app/services/roster-update/roster-update.service';
import { StudentData } from 'src/app/models/student-data.model';
@Component({

  selector: 'roster-table',
  templateUrl: './roster-table.component.html',
  styleUrls: ['./roster-table.component.css']
})

export class RosterTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<StudentData>;
  dataSource: MatTableDataSource<StudentData> = new MatTableDataSource<StudentData>([]);

  rosterService: RosterService;
  rosterUpdateService: RosterUpdateService;
  dialog: MatDialog;

  private roster: StudentData[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  dataColumns = ['first_name', 'last_name', 'pronouns', 'voicepart_name', 'number', 'choir_name', 'grad_year', 'email'];
  allColumns = [...this.dataColumns, 'edit', 'delete'];

  deleteClicked(email: string){
    let arr = [];
    arr.push(email);
    this.rosterService.deleteAccount(arr);
    location.reload();
  }
  editClicked(student : StudentData){
    this.dialog.open(RosterUpdateComponent,
      {
        data: student
      }
    );
  }

  constructor(private rs: RosterService, private md: MatDialog, private rus: RosterUpdateService) { 
    
    this.rosterService = rs;
    this.rosterUpdateService = rus;
    this.dialog = md;

    this.rosterService.getRoster().subscribe({
      next: data => {
        this.roster = data.roster;
        this.dataSource = new MatTableDataSource(this.roster);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;   
      }      
    }); 
    
  }

  ngAfterViewInit(): void {
  }

}
