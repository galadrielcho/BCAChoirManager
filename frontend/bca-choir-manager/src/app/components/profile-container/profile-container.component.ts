import { Component } from '@angular/core';
import { StudentData } from 'src/app/models/student-data.model';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { RosterUpdateService } from 'src/app/services/roster-update/roster-update.service';
import { SignUpService } from 'src/app/services/sign-up-service/sign-up.service';
import { RosterUpdateComponent } from '../roster-update/roster-update.component';
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
              private md: MatDialog) {

    this.dialog = md;
    this.admin = authService.getUserAdmin();
    this.user = authService.getUserEmail();

    if (!this.admin) {
      this.updateProfileDetails();
  
    } else {
      signupService.getEmail(this.user);
    }
  }

  updateProfileDetails() {
    this.rosterService.getAccountDetails(this.user).subscribe(
      data => {
        this.student = data.details;
        this.fullName = this.student?.first_name + " " + this.student?.last_name;
        this.voicepart = this.student?.voicepart_name + " " + this.student?.number    
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
      this.updateProfileDetails();
    }
    
      );
  }


}
