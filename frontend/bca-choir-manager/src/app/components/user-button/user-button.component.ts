import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.css']
})

export class UserButtonComponent {
    constructor(public authService: AuthenticationService) {
    if (this.isAuthenticated()) {}
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getUserTag() {
    return this.authService.getEmailTag();
  }
  
}