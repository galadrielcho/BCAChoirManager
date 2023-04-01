import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account-service/account.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  var = "hello";
  firstname = "";
  lastname = "";
  email = "";
  showError = false;
  showSuccess = false;
  

  constructor(private service: AccountService){

  }

  submit(){
    this.showError = false;
    this.showSuccess = false;
    this.service.checkAdmin([this.email]).subscribe({
      next: (data : any) =>{
        if(data.exists){
          this.showError = true;
        }
        else{
          this.service.addAdmin([this.email, this.firstname, this.lastname]).subscribe({
            next: (data: any) =>{
              if(data.added){
                this.showSuccess = true;
              }
            }
          })
        }
        
      }
    });;
  }

}
