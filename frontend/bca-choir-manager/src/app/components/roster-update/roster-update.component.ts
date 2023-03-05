import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { RosterUpdateService } from '../../services/roster-update/roster-update.service';
import { StudentData } from 'src/app/models/student-data.model';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-roster-update',
  templateUrl: './roster-update.component.html',
  styleUrls: ['./roster-update.component.css']
})
export class RosterUpdateComponent {
  year = new Date().getFullYear();
  
  public student : StudentData = this.orig_student;
  
  voicePartNumbers: Option[] = [{name: String(1), value: 1},
                                {name: String(2), value: 2}];
  choirtypes: Option[] = [{name: "Chamber", value: 0},
                          {name: "Concert", value: 1}];
  voiceparts: Option[] = [{name: "soprano", value: 0}, 
                          {name: "alto", value: 1},
                          {name: "tenor", value: 2},
                          {name: "bass", value: 3}];
  years: Option[] = [{name: String(this.year), value: this.year}, 
                    {name: String(this.year + 1), value: this.year + 1},
                    {name: String(this.year + 2), value: this.year + 2},
                    {name: String(this.year + 3), value: this.year + 3},
                    {name: String(this.year + 4), value: this.year + 4}];

  @ViewChild('firstname') firstname!: ElementRef<HTMLInputElement>;
  @ViewChild('lastname') lastname!: ElementRef<HTMLInputElement>;
  @ViewChild('pronouns') pronouns!: ElementRef<HTMLInputElement>;
  yearPos: String | undefined;
  choirtypePos: String | undefined;
  VPPos: String | undefined;
  VPNPos: String | undefined;


  constructor(public service: RosterUpdateService, 
    @Inject(MAT_DIALOG_DATA) private orig_student: StudentData,
    )
  {}

  ngOnInit() {
  }

  public getFirstName(){
    return this.student.first_name;
  }

  public getLastName(){

    return this.student.last_name;
  }

  public getPronouns(){

    return this.student.pronouns;
  }

  public test(){

    return true;
  }


  public isChoirtypeChecked(value : number){
    let choirtype = (value == 0) ? 'Chamber' : 'Concert';
    if(this.student.choir_name == choirtype){
      return true;
    }
    return false;
  }

  public isYearChecked(year : number){
    if(this.student.grad_year == year){
      return true;
    }
    return false;
  }

  public isVPChecked(value : string){
    console.log(value);
    console.log(this.student.voicepart_name);
    if(this.student.voicepart_name === value){
      return true;
    }
    return false;
  }

  public isVPNChecked(value : number){
    if(this.student.number == value){
      return true;
    }
    return false;
  }

  public submit(){
    let first_name = this.firstname.nativeElement.value ;
    let last_name = this.lastname.nativeElement.value;
    let pronouns = this.pronouns.nativeElement.value;
    let VP = this.voiceparts[Number(this.VPPos)];
    let VPN = this.voicePartNumbers[Number(this.VPNPos)];
    let choirtype = this.choirtypes[Number(this.choirtypePos)];
    let grad_year = this.years[Number(this.yearPos)];

    let updatedStudent : StudentData = {
      email: this.student.email,
      first_name: (this.isValidString(first_name) ? first_name : this.student.first_name),
      last_name: this.isValidString(last_name) ? last_name : this.student.last_name,
      pronouns: this.isValidString(pronouns) ? pronouns : this.student.pronouns,
      voicepart_name: this.isValidRadioButton(VP) ? VP.name : this.student.voicepart_name,
      number: this.isValidRadioButton(VPN) ? VPN.value : this.student.number,
      choir_name: this.isValidRadioButton(choirtype) ? choirtype.name : this.student.choir_name,
      grad_year: this.isValidRadioButton(grad_year) ? grad_year.value : this.student.grad_year

    };

    this.service.updateDetails(updatedStudent);

    this.service.closeEdit();
  }
  
  public isValidString(s : String){
    if (s.trim() == ""){
      return false;
    }
    return true;
  }
  public isValidRadioButton(rb : Option){
    if (rb == undefined){
      return false;
    }
    return true;
  }

}
export interface Option {
  name: string;
  value: number;
}

