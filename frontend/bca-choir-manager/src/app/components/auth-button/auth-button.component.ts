import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})

export class AuthButtonComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, public authService: AuthenticationService) {}
  click(){
    this.authService.login();

    
  }
  
}