import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback-page.component.html',
  styleUrls: ['./callback-page.component.css']
})
export class CallbackComponent implements OnInit{
  constructor(private router: Router, 
              private authService : AuthenticationService) {
  }
  ngOnInit(): void {
    this.authService.postLogin();
    this.router.navigate(['/home']);

  }


}
