import { Component, ElementRef, ViewChild } from '@angular/core';
import { SignUpService } from '../../services/sign-up-service/sign-up.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StudentData } from 'src/app/models/student-data.model';

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
  
  signupForm = new FormGroup({
    firstName: new FormControl('', 
                              [Validators.required,
                              Validators.pattern('[a-zA-Z -/]*')]),
    lastName: new FormControl('', 
                              [Validators.required,
                              Validators.pattern('[a-zA-Z -/]*')]),
    pronouns : new FormControl('',
                              Validators.pattern('[a-zA-Z -/]*')),
    voicepart : new FormControl('', 
                              [Validators.required]),
    voicepartNumber : new FormControl('', 
                              [Validators.required]),
    choirtype : new FormControl('',
                              [Validators.required]),
    year : new FormControl('',
                              [Validators.required])
  });


  constructor(public signupService: SignUpService){

  }

  public submit(){
    let newDetails = [this.signupService.email, this.signupForm.value.firstName, 
                  this.signupForm.value.lastName, this.signupForm.value.pronouns, 
                  this.signupForm.value.voicepart, this.signupForm.value.voicepartNumber, 
                  this.signupForm.value.choirtype, this.signupForm.value.year]

    this.signupService.postDetails(newDetails);
    this.signupService.close();
  }
  
  public isValidString(s : String){
    if (s.trim() == ""){
      return false;
    }
    return true;
  }
}

