import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { RosterService} from '../../services/roster-service/roster.service';


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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['first_name', 'last_name', 'pronouns', 'voicepart', 'choir_type', 'grad_year', 'email', 'edit', 'delete'];


  constructor(private rosterService: RosterService) { 
    var roster: DataTableItem[] = [];

    this.rosterService.getStatus().subscribe({
      next: data => {

        for(let i = 0; i < data.roster.length; i++){
          roster.push({first_name: data.roster[i][0], 
                      last_name: data.roster[i][1],
                      pronouns: data.roster[i][2],
                      voicepart: data.roster[i][3],
                      choir_type: data.roster[i][4],
                      grad_year: data.roster[i][5],
                      email: data.roster[i][6]}
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
