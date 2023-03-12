import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { RosterUpdateService } from '../../services/roster-update/roster-update.service';
import { StudentData } from 'src/app/models/student-data.model';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


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
                    {name: String(this.year + 4), value: this.year + 4}]

  @ViewChild('firstname') firstname!: ElementRef<HTMLInputElement>;
  @ViewChild('lastname') lastname!: ElementRef<HTMLInputElement>;
  @ViewChild('pronouns') pronouns!: ElementRef<HTMLInputElement>;
  voicepartChoice : string = this.orig_student.voicepart_name;
  voicepartNumberChoice : number = this.orig_student.number;
  choirChoice : string = this.orig_student.choir_name;
  yearChoice : number = this.orig_student.grad_year;


  constructor(public service: RosterUpdateService, 
    public dialogRef: MatDialogRef<RosterUpdateComponent>,
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

    let updatedStudent : StudentData = {
      email: this.student.email,
      first_name: (this.isValidString(first_name) ? first_name : this.student.first_name),
      last_name: this.isValidString(last_name) ? last_name : this.student.last_name,
      pronouns: this.isValidString(pronouns) ? pronouns : this.student.pronouns,
      voicepart_name: this.voicepartChoice,
      number: this.voicepartNumberChoice,
      choir_name: this.choirChoice,
      grad_year: this.yearChoice
      
    };

    this.service.updateDetails(updatedStudent);

    this.dialogRef.close();
    window.location.reload();

  }
  
  public isValidString(s : String){
    if (s.trim() == ""){
      return false;
    }
    return true;
  }
  public changeYear(year : number) {
    this.yearChoice = year;
  }

  public changeVoicePart(vp : string) {
    this.voicepartChoice = vp;
  }

  public changeVoicePartNum(vpN : number) {
    this.voicepartNumberChoice = vpN;
  }

  public changeChoirType(choir : string) {
    this.choirChoice = choir;
  }


}
export interface Option {
  name: string;
  value: number;
}

