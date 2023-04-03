import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})

export class AuthButtonComponent {
  constructor(public authService: AuthenticationService) {}

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
  
}