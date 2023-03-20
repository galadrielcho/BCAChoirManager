
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'admin-general-container',
  templateUrl: './admin-general-container.component.html',
  styleUrls: ['./admin-general-container.component.css']
})
export class AdminGeneralContainerComponent {
  admins: String[] = [];
  authService: AuthenticationService;
  constructor(public as: AuthenticationService){
    this.authService = as;
    this.updateAdmins();
  }
  updateAdmins(){
    console.log("here");
    this.authService.getAdmins().subscribe({
      next: data => {
        console.log(data); 
        const list = [];
        for(let i = 0; i < data.admins.length; i++){
          let name = data.admins[i].first_name + " " + data.admins[i].last_name + " (" + data.admins[i].email + ")";
          list.push(name); 
        }
        this.admins = list;
      }      
    });

  }
}
