import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { RosterUpdateService } from '../services/roster-update/roster-update.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


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
  email = "";
  filteredParts: Observable<string[]> | undefined;
  control1 = new FormControl('');
  

  constructor(public service: RosterUpdateService){
    const isEmailSet = new Promise<string>((resolve, reject) =>{
      if(service.email == ""){
        reject();
      }
      else{
        resolve(service.email);  
      }
    });

    isEmailSet.then((value) =>{
    }).catch((error) =>{
      console.log(error);
    }).finally(() => {
      this.email = service.email;
    });
    service.setEmail("");
  }

  ngOnInit() {}

}
