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
    let newDetails: any[] = [this.service.email];
    const first_name = this.firstname.nativeElement.value;
    const last_name = this.lastname.nativeElement.value;
    const pronouns = this.pronouns.nativeElement.value;
    const VP = this.voiceparts[Number(this.VPPos)];
    const VPN = this.voicePartNumbers[Number(this.VPNPos)];
    const choirtype = this.choirtypes[Number(this.choirtypePos)];
    const grad_year = this.years[Number(this.yearPos)];
    newDetails.push(first_name);
    newDetails.push(last_name);
    newDetails.push(pronouns);
    newDetails.push(VP.name);
    newDetails.push(VPN.name);
    newDetails.push(choirtype.name);
    newDetails.push(grad_year.name);    
    this.service.postDetails(newDetails);

    this.service.close();
  }

  restrictInput(event: {charCode: any; }){   
    var k;  
    k = event.charCode;                                                    // - and / characters
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k == 45 || k == 47); 
  }

  public disableSubmit(){
    if((this.firstname == undefined) || (this.lastname == undefined) || (this.pronouns == undefined) || (this.yearPos == undefined) || (this.choirtypePos == undefined) || (this.VPPos == undefined) || (this.VPNPos == undefined)){
      return true;
    }
  
    return false;
  }

  public isValidString(s : String){
    if (s.trim() == ""){
      return false;
    }
    return true;
  }
}
export interface Option {
  name: string;
  value: number;
}
