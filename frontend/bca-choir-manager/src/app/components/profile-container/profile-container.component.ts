import { Component } from '@angular/core';
import { StudentData } from 'src/app/models/student-data.model';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { RosterUpdateService } from 'src/app/services/roster-update/roster-update.service';
import { SignUpService } from 'src/app/services/sign-up-service/sign-up.service';
import { ErrorService } from 'src/app/services/error-service/error.service';

import { RosterUpdateComponent } from '../roster-update/roster-update.component';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.css']
})

export class ProfileContainerComponent {
  student : StudentData | null = null;
  admin : boolean = false;

  fullName : string = "";
  voicepart : string = "";
  dialog: MatDialog;
  user : string;


  constructor(private authService : AuthenticationService,
              private rosterService : RosterUpdateService,
              private signupService : SignUpService,
              private errorService : ErrorService,
              private md: MatDialog) {

    this.dialog = md;
    this.admin = authService.isAdmin();
    this.user = authService.getUserEmail();

    if (!this.admin) {
      this.updateStudentProfileDetails();
  
    } else {
      signupService.getEmail(this.user);
    }
  }

  openDialogConfirm(){
    this.md.open(DeleteAccountDialogComponent, {width:"300px"});
  }

  isAdmin(){
    return this.authService.isAdmin();
  }

  updateStudentProfileDetails() {
    this.rosterService.getAccountDetails(this.user).subscribe({
        next: data => {
          this.student = data.details;
          this.fullName = this.student?.first_name + " " + this.student?.last_name;
          this.voicepart = this.student?.voicepart_name + " " + this.student?.number    
        },
        error: error=>{
          this.errorService.showErrorDialog("Could not get profile from database.")
        }      
      }
    );

  }

  editProfile(){
    const dialogRef = this.dialog.open(RosterUpdateComponent,
      {
        data: this.student
      }
    );

    dialogRef.afterClosed().subscribe(updatedStudent => {
      this.updateStudentProfileDetails();
    }
    
      );
  }


}
