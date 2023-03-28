import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account-service/account.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  firstname = "";
  lastname = "";
  email = "";

  constructor(private service: AccountService){

  }

  submit(){
    this.service.addAdmin([this.email, this.firstname, this.lastname]);
  }

}
