import { Component } from '@angular/core';

@Component({
  selector: 'app-roster-page',
  templateUrl: './roster-page.component.html',
  styleUrls: ['./roster-page.component.css']
})
export class RosterPageComponent {
  constructor() {
  }
  export(){
    window.open("https://docs.google.com/spreadsheets/d/1hOvut5eeqbxL-I1KadDFHuUCatiXuqL_n3LHoFKAhuY/edit#gid=0", "_blank");
  }
}
