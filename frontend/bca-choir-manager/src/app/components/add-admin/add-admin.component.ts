import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account-service/account.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  showError = false;
  showSuccess = false;
  
  public addAdminForm : FormGroup = new FormGroup({
    email : new FormControl("", 
                        [Validators.required, Validators.email]),
    first_name : new FormControl('',
                        [Validators.required, Validators.pattern('[a-zA-Z -/]*')]),
    last_name : new FormControl('',
                        [Validators.required, Validators.pattern('[a-zA-Z -/]*')])
  })
  
  constructor(private service: AccountService){

  }

  submit(){
    this.showError = false;
    this.showSuccess = false;
    this.service.checkAdmin([this.addAdminForm.value.email]).subscribe({
      next: (data : any) =>{
        if(data.exists){
          this.showError = true;
        }
        else{
          this.service.addAdmin([this.addAdminForm.value.email, 
            this.addAdminForm.value.first_name, 
            this.addAdminForm.value.last_name]).subscribe({
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
