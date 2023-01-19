import { Injectable } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class RosterUpdateService {
  updateForm: FormGroup = new FormGroup({
    $key: new FormControl(null),//primary key to identify each student
    first_name: new FormControl(' '),
    last_name: new FormControl(' '),
    pronouns: new FormControl(' '),
    voicepart: new FormControl(' '),
    choirtype: new FormControl(' '),
    grad_year: new FormControl(' ')
  });

  constructor() { 
  }
}
