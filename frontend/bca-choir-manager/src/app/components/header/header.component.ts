import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpService } from 'src/app/services/sign-up-service/sign-up.service';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dialog: MatDialog;
  admin: Boolean | undefined;
  seconds: number;

  constructor(private md: MatDialog, private signUpService: SignUpService, public authService: AuthenticationService) { 
    this.dialog = md;
    this.admin = false;
    this.seconds = 0;
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }


  ngOnInit(): void {
  }

}
