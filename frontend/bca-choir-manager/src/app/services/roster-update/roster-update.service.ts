import { Injectable } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class RosterUpdateService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),//primary key to identify each student
    voicepart: new FormControl(' '),
    choirtype: new FormControl(' '),
  });
}
