import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpService } from 'src/app/services/sign-up-service/sign-up.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dialog: MatDialog;
  signUpService: SignUpService

  constructor(private md: MatDialog, private sus: SignUpService, public auth: AuthService) { 
    this.dialog = md;
    this.signUpService = sus;
  }

  isAdmin(email: string|undefined){
    return false;
  }

  ngOnInit(): void {
  }

}
