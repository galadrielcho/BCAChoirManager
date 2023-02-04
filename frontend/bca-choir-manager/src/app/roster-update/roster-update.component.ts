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
  year = new Date().getFullYear();
  
  email = "";
  details = [];
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


  constructor(public service: RosterUpdateService){
    // get details of person whose profile we are editing
    const isEmailSet = new Promise<string>((resolve, reject) =>{
      if(service.email == ""){
        reject();
      }
      else{
        resolve(service.email);  
      }
    });

    isEmailSet.then(() =>{
    }).catch((error) =>{
      console.log(error);
    }).finally(() => {
      this.email = service.email;
    });
    service.setEmail("");

    //this.vpn = this.getVoicePartNumber();
  }

  ngOnInit() {
    this.service.getAccountDetails(this.email).subscribe({
      next: data => {
        this.details = data.details[0];
      }      
    }); 
    
  }

  public getFirstName(){
    return this.details[0];
  }

  public getLastName(){
    return this.details[1];
  }

  public getPronouns(){
    return this.details[2];
  }

  public isChoirtypeChecked(value : number){
    let choirtype = (value == 0) ? 'Chamber' : 'Concert';
    if(this.details[5] == choirtype){
      return true;
    }
    return false;
  }

  public isYearChecked(value : number){
    let year;
    if(value == 0){
      year = this.year;
    }
    else if(value == 1){
      year = this.year + 1;
    }
    else if(value == 2){
      year = this.year + 2;
    }
    else if(value == 3){
      year = this.year + 3;
    }
    else{
      year = this.year + 4;
    }
    if(this.details[6] == year){
      return true;
    }
    return false;
  }

  public isVPChecked(value : number){
    let vp;
    if(value == 0){
      vp = "soprano";
    }
    else if(value == 1){
      vp = "alto";
    }
    else if(value == 2){
      vp = "tenor";
    }
    else{
      vp = "bass";
    }

    if(this.details[3] == vp){
      return true;
    }
    return false;
  }

  public isVPNChecked(value : number){
    if(this.details[4] == (value + 1)){
      return true;
    }
    return false;
  }

  public submit(){
    let updatedDetails: any[] = [this.email];
    const first_name = this.firstname.nativeElement.value;
    const last_name = this.lastname.nativeElement.value;
    const pronouns = this.pronouns.nativeElement.value;
    const VP = this.voiceparts[Number(this.VPPos)];
    const VPN = this.voicePartNumbers[Number(this.VPNPos)];
    const choirtype = this.choirtypes[Number(this.choirtypePos)];
    const grad_year = this.years[Number(this.yearPos)];
    updatedDetails.push((this.isValidString(first_name) ? first_name : this.details[0]));
    updatedDetails.push(this.isValidString(last_name) ? last_name : this.details[1]);
    updatedDetails.push(this.isValidString(pronouns) ? pronouns : this.details[2]);
    updatedDetails.push(this.isValidRadioButton(VP) ? VP.name : this.details[3]);
    updatedDetails.push(this.isValidRadioButton(VPN) ? VPN.name : this.details[4]);
    updatedDetails.push(this.isValidRadioButton(choirtype) ? choirtype.name : this.details[5]);
    updatedDetails.push(this.isValidRadioButton(grad_year) ? grad_year.name : this.details[6]);    
    this.service.updateDetails(updatedDetails);
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

