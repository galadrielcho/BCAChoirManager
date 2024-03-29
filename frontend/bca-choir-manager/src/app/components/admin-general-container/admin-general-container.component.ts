
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { DeleteAdminComponent } from '../delete-admin/delete-admin.component';
import { RecordsDeleteDialogComponent } from '../records-delete-dialog/records-delete-dialog.component';

@Component({
  selector: 'admin-general-container',
  templateUrl: './admin-general-container.component.html',
  styleUrls: ['./admin-general-container.component.css']
})
export class AdminGeneralContainerComponent {
  admins: String[] = [];
  authService: AuthenticationService;
  dialog: MatDialog;
  constructor(public as: AuthenticationService, private md: MatDialog,){
    this.authService = as;
    this.updateAdmins();
    this.dialog = md;
  }
  addAdmin(){
    this.dialog.open(AddAdminComponent).afterClosed().subscribe(() => {
      this.updateAdmins();
    });
  }
  deleteAdmin(){
    this.dialog.open(DeleteAdminComponent).afterClosed().subscribe(() => {
      this.updateAdmins();
    });

  }
  updateAdmins(){
    this.authService.getAdmins().subscribe({
      next: data => {
        const list = [];
        for(let i = 0; i < data.admins.length; i++){
          let name = data.admins[i].first_name + " " + data.admins[i].last_name + " (" + data.admins[i].email + ")";
          list.push(name); 
        }
        this.admins = list;
      }      
    });

  }
  deleteRecords(){
    this.dialog.open(RecordsDeleteDialogComponent);
  }
}
