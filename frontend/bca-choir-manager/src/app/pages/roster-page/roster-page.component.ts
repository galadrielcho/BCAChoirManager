import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-roster-page',
  templateUrl: './roster-page.component.html',
  styleUrls: ['./roster-page.component.css']
})
export class RosterPageComponent {
  url = 'https://docs.google.com/spreadsheets/d/1hOvut5eeqbxL-I1KadDFHuUCatiXuqL_n3LHoFKAhuY/edit?usp=sharing';
  constructor(public auth: AuthService) {
  }
  export(){
    window.open(this.url, "_blank");
  }
}
