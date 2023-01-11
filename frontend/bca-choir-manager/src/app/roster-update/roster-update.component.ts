import { Component } from '@angular/core';
import { RosterUpdateService } from '../services/roster-update/roster-update.service';

@Component({
  selector: 'app-roster-update',
  templateUrl: './roster-update.component.html',
  styleUrls: ['./roster-update.component.css']
})
export class RosterUpdateComponent {
  constructor(private rosterUpdateService: RosterUpdateService){

  }
}
