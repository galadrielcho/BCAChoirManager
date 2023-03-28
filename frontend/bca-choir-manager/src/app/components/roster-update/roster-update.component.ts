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

  firstName : string = this.orig_student.first_name
  lastName : string = this.orig_student.last_name
  pronouns : string = this.orig_student.pronouns
  voicepartChoice : string = this.orig_student.voicepart_name;
  voicepartNumberChoice : number = this.orig_student.voicepart_number;
  choirChoice : string = this.orig_student.choir_name;
  yearChoice : number = this.orig_student.grad_year;


  constructor(private service: RosterUpdateService, 
    private dialogRef: MatDialogRef<RosterUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) private orig_student: StudentData,
    )
  {}

  ngOnInit() {
  }

  public isChoirtypeChecked(value : number){
    let choirtype = (value == 0) ? 'Chamber' : 'Concert';
    return this.student.choir_name == choirtype;
  }

  public isYearChecked(year : number){
    return this.student.grad_year == year;
  }

  public isVPChecked(value : string){
    return this.student.voicepart_name === value;
  }

  public isVPNChecked(value : number){
    return this.student.voicepart_number == value;
  }


  public submit(){

    let updatedStudent : StudentData = {
      email: this.student.email,
      first_name: (this.isValidString(this.firstName) ? this.firstName : this.student.first_name),
      last_name: this.isValidString(this.firstName) ? this.lastName : this.student.last_name,
      pronouns: this.isValidString(this.firstName) ? this.pronouns : this.student.pronouns,
      voicepart_name: this.voicepartChoice,
      voicepart_number: this.voicepartNumberChoice,
      choir_name: this.choirChoice,
      grad_year: this.yearChoice
      
    };

    this.service.updateDetails(updatedStudent);

    this.dialogRef.close();
    window.location.reload();

  }
  
  public isValidString(s : String){
    // Call util service to test this
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
  /*
  restrictInput(event: {charCode: any;})
  {   
    var k;  
    k = event.charCode; 
    return((k > 64 && k < 91) || (k == 189) || (k == 111)); 
  }
  */

  restrictInput(event: {charCode: any; }){   
    var k;  
    k = event.charCode;                                                    // - and / characters
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k == 45 || k == 47); 
  }


}
export interface Option {
  name: string;
  value: number;
}

