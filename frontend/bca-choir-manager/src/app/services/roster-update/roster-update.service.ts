import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { StudentData } from 'src/app/models/student-data.model';

@Injectable({
  providedIn: 'root'
})
export class RosterUpdateService {


  dialog!: MatDialog;
  location!: Location;

  constructor(private http: HttpClient) { 
  }
  public getAccountDetails(email: string){
    let url = `/api/get-student/${email}`;
    return this.http.get<any>(url);
  }

  public updateDetails(updatedStudent : StudentData){
    this.http.post('/api/roster-update', updatedStudent).subscribe();
  }

  public closeEdit(){
    this.dialog.closeAll();
    this.location.reload();
  }

}
