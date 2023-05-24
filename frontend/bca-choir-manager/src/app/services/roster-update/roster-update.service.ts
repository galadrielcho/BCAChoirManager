import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { StudentData } from 'src/app/models/student-data.model';
import { ErrorService } from '../error-service/error.service';

@Injectable({
  providedIn: 'root'
})
export class RosterUpdateService {


  dialog!: MatDialog;
  location!: Location;

  constructor(private http: HttpClient, private errorService : ErrorService) { 
  }
  public getAccountDetails(email: string){
    let url = `/api/get-student/${email}`;
    return this.http.get<any>(url);
  }

  public updateDetails(updatedStudent : StudentData){
    this.http.post('/api/roster-update', updatedStudent).subscribe({
      error: error => {
        this.errorService.showErrorDialog(`Could not update student information for ${updatedStudent.first_name} ${updatedStudent.last_name} in database.`);

      }
    }
    );
  }

  public closeEdit(){
    this.dialog.closeAll();
    this.location.reload();
  }

}
