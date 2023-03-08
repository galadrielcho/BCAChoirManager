import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { RosterService} from '../../services/roster-service/roster.service';
import { MatDialog } from '@angular/material/dialog';
import { RosterUpdateComponent } from 'src/app/components/roster-update/roster-update.component';
import { RosterUpdateService } from 'src/app/services/roster-update/roster-update.service';
import { StudentData } from 'src/app/models/student-data.model';
import { AuthService } from '@auth0/auth0-angular';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
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
  authenticationService: AuthenticationService

  rosterService: RosterService;
  rosterUpdateService: RosterUpdateService;
  dialog: MatDialog;
  admin: Boolean | undefined;

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
  
  isAdmin(email: string|undefined){
    this.authenticationService.isAdmin(email).then(res => {
      this.admin = res;
    })
    return this.admin;
  }
  
  sleep(milliseconds: number) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  
  constructor(private rs: RosterService, private md: MatDialog, private rus: RosterUpdateService, public auth: AuthService, public as: AuthenticationService) { 
    
    this.rosterService = rs;
    this.rosterUpdateService = rus;
    this.dialog = md;
    this.authenticationService = as;
    this.rosterService.getRoster().subscribe({
      next: data => {
        this.roster = data.roster;
        this.dataSource = new MatTableDataSource(this.roster);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;   
      }      
    }); 
/*
    // ATTEMPT to restrict edit & delete buttons to admin
    if(this.auth.isAuthenticated$){
      this.auth.user$.subscribe({
        next: data => {
          if(data != undefined){
            const email = data.email;     
            this.authenticationService.isAdmin(email).then(res => {
              this.admin = res;
            })
            
          }
          else{
            console.log("User data does not exist");
          }
        }
      });
    }
    if(this.admin != undefined){
      if(this.admin == true){
        console.log("is admin");
        this.allColumns = [...this.dataColumns, 'edit', 'delete'];
      }
      else{
        console.log("not admin");
        this.allColumns = [...this.dataColumns];
      }
    }
    */
    
  }

  ngAfterViewInit(): void {
  }

}
