import { AfterViewInit, Component, ElementRef, ViewChild , Renderer2} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { RosterService} from '../../services/roster-service/roster.service';
import {MatDialog} from '@angular/material/dialog';
import { RosterUpdateComponent } from 'src/app/roster-update/roster-update.component';
import { RosterUpdateService } from 'src/app/services/roster-update/roster-update.service';
@Component({

  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})

export class DataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  dataSource: DataTableDataSource | undefined;
  rosterService: RosterService;
  rosterUpdateService: RosterUpdateService;
  dialog: MatDialog;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['first_name', 'last_name', 'pronouns', 'voicepart', 'number', 'choir_type', 'grad_year', 'email', 'edit', 'delete'];
  
  deleteClicked(email: string){
    let arr = [];
    arr.push(email);
    this.rosterService.deleteAccount(arr);
    location.reload();
  }
  editClicked(email:string){
    this.dialog.open(RosterUpdateComponent);
    this.rosterUpdateService.setEmail(email);
    this.rosterUpdateService.send(this.dialog, location);
  }

  constructor(private rs: RosterService, private md: MatDialog, private rus: RosterUpdateService) { 
    
    this.rosterService = rs;
    this.rosterUpdateService = rus;
    this.dialog = md;
    var roster: DataTableItem[] = [];

    this.rosterService.getRoster().subscribe({
      next: data => {

        for(let i = 0; i < data.roster.length; i++){
          
          roster.push({first_name: data.roster[i][0], 
                      last_name: data.roster[i][1],
                      pronouns: data.roster[i][2],
                      voicepart: data.roster[i][3],
                      number: data.roster[i][4],
                      choir_type: data.roster[i][5],
                      grad_year: data.roster[i][6],
                      email: data.roster[i][7]}
                      
          );
          
        }
        this.dataSource = new DataTableDataSource(roster);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;   
      }      
    }); 
    
    
  
    
    
  }

  ngAfterViewInit(): void {
  }

}
