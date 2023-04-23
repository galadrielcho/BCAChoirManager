import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account-service/account.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-delete-admin',
  templateUrl: './delete-admin.component.html',
  styleUrls: ['./delete-admin.component.css']
})
export class DeleteAdminComponent {
  email = "";
  showDNE = false;
  showSelfDeletionError = false;
  showSuccess = false;
  constructor(private accService: AccountService, private authService: AuthenticationService){

  }
  submit(){
    this.showDNE = false;
    this.showSelfDeletionError = false;
    this.showSuccess = false;
    let user = this.authService.getUserEmail();

    if(user == this.email){
      this.showSelfDeletionError = true;
    }
    else{
      this.accService.checkAdmin([this.email]).subscribe({
        next: (data: any) =>{
          console.log("data: " + data.exists);
          if (!(data.exists)){
            this.showDNE = true;
          }
          else{
            this.accService.deleteAdmin([this.email]).subscribe({
              next: (info: any) =>{
                if(info.success){
                  this.showSuccess = true;
                }
              }
            });
          }
        }
      });
    }
    
  }
}
