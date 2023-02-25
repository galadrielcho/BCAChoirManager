import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpService } from 'src/app/services/sign-up-service/sign-up.service';
import { SignUpComponent } from 'src/app/sign-up/sign-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dialog: MatDialog;
  signUpService: SignUpService

  constructor(private md: MatDialog, private sus: SignUpService) { 
    this.dialog = md;
    this.signUpService = sus;
  }

  ngOnInit(): void {
  }

}
