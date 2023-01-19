import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RosterUpdateService } from '../services/roster-update/roster-update.service';

@Component({
  selector: 'app-roster-update',
  templateUrl: './roster-update.component.html',
  styleUrls: ['./roster-update.component.css']
})
export class RosterUpdateComponent {
  year1 = new Date().getFullYear(); 
  year2 = this.year1 + 1;
  year3 = this.year1 + 2;
  year4 = this.year1 + 3;
  year5 = this.year1 + 4;
  constructor(public service: RosterUpdateService, private renderer : Renderer2){
     
    
    //this.renderer.setValue(this.year1.nativeElement, currentYear.toString()
    
    //this.year1.nativeElement.setAttribute('value', currentYear.toString());
    /*
    this.year2.nativeElement.value = (currentYear + 1).toString();
    this.year3.nativeElement.value = (currentYear + 2).toString();
    this.year4.nativeElement.value = (currentYear + 3).toString();
    this.year5.nativeElement.value = (currentYear + 4).toString();
    */
    
    
  }

}
