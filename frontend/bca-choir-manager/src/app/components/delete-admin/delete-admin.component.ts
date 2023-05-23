import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account-service/account.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorService } from 'src/app/services/error-service/error.service';


@Component({
  selector: 'app-delete-admin',
  templateUrl: './delete-admin.component.html',
  styleUrls: ['./delete-admin.component.css']
})
export class DeleteAdminComponent {
  public deleteAdminForm : FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email])});

  showDNE = false;
  showSelfDeletionError = false;
  showSuccess = false;
  constructor(private accService: AccountService, private authService: AuthenticationService, private errorService: ErrorService){

  }
  submit(){
    this.showDNE = false;
    this.showSelfDeletionError = false;
    this.showSuccess = false;
    let data = this.authService.getUserEmail();

    if(data == this.deleteAdminForm.value.email){
      this.showSelfDeletionError = true;
    }
    else{
      this.accService.checkAdmin([this.deleteAdminForm.value.email]).subscribe({
        next: (data: any) =>{
          if (!(data.exists)){
            this.showDNE = true;
          }
          else{
            this.accService.deleteAdmin(this.deleteAdminForm.value.email).subscribe({
              next: (info: any) =>{
                if(info.success){
                  this.showSuccess = true;
                }
              },
              error: error =>{
                this.errorService.showErrorDialog(`Could not delete admin ${this.deleteAdminForm.value.email} from database.`);
              }
            });
          }
        }
      });
    }
  }
}
