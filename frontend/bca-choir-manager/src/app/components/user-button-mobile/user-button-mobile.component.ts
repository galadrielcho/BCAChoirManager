import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'user-button-mobile',
  templateUrl: './user-button-mobile.component.html',
  styleUrls: ['./user-button-mobile.component.css']
})

export class UserButtonMobileComponent {
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