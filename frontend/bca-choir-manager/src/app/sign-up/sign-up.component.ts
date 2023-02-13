import { Component, ElementRef, ViewChild } from '@angular/core';
import { SignUpService } from '../services/sign-up-service/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  year = new Date().getFullYear();
  voicePartNumbers: Option[] = [{name: String(1), value: 0},
    {name: String(2), value: 1}];

  choirtypes: Option[] = [{name: "Chamber", value: 0},
  {name: "Concert", value: 1}];

  voiceparts: Option[] = [{name: "soprano", value: 0}, 
  {name: "alto", value: 1},
  {name: "tenor", value: 2},
  {name: "bass", value: 3}];
  
  years: Option[] = [{name: String(this.year), value: 0}, 
    {name: String(this.year + 1), value: 1},
    {name: String(this.year + 2), value: 2},
    {name: String(this.year + 3), value: 3},
    {name: String(this.year + 4), value: 4}];

  @ViewChild('firstname') firstname!: ElementRef<HTMLInputElement>;
  @ViewChild('lastname') lastname!: ElementRef<HTMLInputElement>;
  @ViewChild('pronouns') pronouns!: ElementRef<HTMLInputElement>;
  yearPos: String | undefined;
  choirtypePos: String | undefined;
  VPPos: String | undefined;
  VPNPos: String | undefined;

  constructor(public service: SignUpService){

  }

  public submit(){
    this.service.close();
  }
  public disableSubmit(){
    if((this.firstname == undefined) || (this.lastname == undefined) || (this.pronouns == undefined) || (this.yearPos == undefined) || (this.choirtypePos == undefined) || (this.VPPos == undefined) || (this.VPNPos == undefined)){
      return true;
    }
    return false;
  }
}
export interface Option {
  name: string;
  value: number;
}
