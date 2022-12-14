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
  dataSource!: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['first_name', 'last_name', 'pronouns', 'voicepart', 'choir_type', 'grad_year', 'email'];


  constructor(private rosterService: RosterService) { 
    var EXAMPLE_DATA: DataTableItem[] = [];

   this.rosterService.getStatus().subscribe( resp => {
        /*
      console.log("here1");
      var data = JSON.parse(resp.roster);
      console.log("here2");
      var roster: DataTableItem[] = [];
      for(let i = 0; i < data.length; i++){
        roster.push({first_name: data[i][0], last_name: data[i][1], pronouns: data[i][2], voicepart: data[i][3], choir_type: data[i][4], grad_year: data[i][5], email: data[i][6]});
      }
        
      EXAMPLE_DATA = [
  
        {first_name: "Galadriel", last_name: "Cho", pronouns: "she/her", voicepart: "alto", choir_type: "Concert", grad_year: 2023, email: "galcho23@bergen.org"},
        {first_name: "Satwika", last_name: "Vemuri", pronouns: "she/her", voicepart: "soprano", choir_type: "Chamber", grad_year: 2023, email: "satvem23@bergen.org"},
      ];  
      */
      console.log("here3") 
      
    });
    
    console.log("here4");
    this.dataSource = new DataTableDataSource(EXAMPLE_DATA);
  
    
    
    console.log(this.dataSource.data);  

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
