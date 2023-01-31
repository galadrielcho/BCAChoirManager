import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class RosterUpdateService {
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),//primary key to identify each student
    first_name: new FormControl(' ', Validators.required),
    last_name: new FormControl(' ', Validators.required),
    pronouns: new FormControl(' ', Validators.required),
    voicepart: new FormControl(' ', Validators.required),
    soprano: new FormControl(' '),
    alto: new FormControl(' '),
    tenor: new FormControl(' '),
    bass: new FormControl(' '),
    number: new FormControl(' ', Validators.required),
    one: new FormControl(' '),
    two: new FormControl(' '),
    choirtype: new FormControl(' ', Validators.required),
    concert: new FormControl(' '),
    chamber: new FormControl(' '),
    grad_year: new FormControl(' ', Validators.required)
  });

  email = "";

  constructor() { 
  }

  public setEmail(email: string){
    this.email = email;
  }


}
