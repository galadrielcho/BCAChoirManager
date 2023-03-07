import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpService } from 'src/app/services/sign-up-service/sign-up.service';
import { AuthService } from '@auth0/auth0-angular';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dialog: MatDialog;
  signUpService: SignUpService
  authenticationService: AuthenticationService

  constructor(private md: MatDialog, private sus: SignUpService, public auth: AuthService, public as: AuthenticationService) { 
    this.dialog = md;
    this.signUpService = sus;
    this.authenticationService = as;
  }

  isAdmin(email: string|undefined){
    this.authenticationService.isAdmin(email).then(res => {
      //WTH SHOULD I DO HERE
    })
    
  }

  ngOnInit(): void {
  }

}
