import { Component, ElementRef, ViewChild } from '@angular/core';
import { SignUpService } from '../../services/sign-up-service/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  year = new Date().getFullYear();
  years =
    [this.year, this.year + 1, this.year + 2, this.year + 3, this.year + 4];
  choirtypes = ["Chamber", "Concert"]
  voiceparts = ["soprano", "alto", "tenor", "bass"]
  voicepartNumbers = [1, 2, 3, 4]
  
  @ViewChild('firstname') firstname!: ElementRef<HTMLInputElement>;
  @ViewChild('lastname') lastname!: ElementRef<HTMLInputElement>;
  @ViewChild('pronouns') pronouns!: ElementRef<HTMLInputElement>;

  choirtype: String | undefined;
  voicepart: String | undefined;
  voicepartNumber: String | undefined;

  constructor(public signupService: SignUpService){

  }

  public submit(){
    let newDetails: any[] = [this.signupService.email];
    const first_name = this.firstname.nativeElement.value;
    const last_name = this.lastname.nativeElement.value;
    const pronouns = this.pronouns.nativeElement.value;

    newDetails = [this.signupService.email, first_name, last_name, pronouns, this.voicepart, this.voicepartNumber, this.choirtype, this.year]

    this.signupService.postDetails(newDetails);
    this.signupService.close();
  }

  restrictChar(event: {charCode: any; }){   
    var k;  
    k = event.charCode;                                                    // - and / characters
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k == 45 || k == 47); 
  }

  public disableSubmit(){
    if((this.firstname == undefined) || (this.lastname == undefined) || (this.pronouns == undefined) || (this.year == undefined) || (this.choirtype == undefined) || (this.voicepart == undefined) || (this.voicepartNumber == undefined)){
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

