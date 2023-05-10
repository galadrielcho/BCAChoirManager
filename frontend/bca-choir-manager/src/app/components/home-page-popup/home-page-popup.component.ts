import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-home-page-popup',
  templateUrl: './home-page-popup.component.html',
  styleUrls: ['./home-page-popup.component.css'],
})
export class HomePagePopupComponent {

  contentForm = new FormGroup({
    about: new FormControl('', 
                              [Validators.required,
                              Validators.pattern('[a-zA-Z -/]*')]),
    group1: new FormControl('', 
                              [Validators.required,
                              Validators.pattern('[a-zA-Z -/]*')]),
    group2 : new FormControl('',
                              Validators.pattern('[a-zA-Z -/]*')),
    conductor : new FormControl('',
                              Validators.pattern('[a-zA-Z -/]*')) 
  });

  constructor(
    private dialogRef: MatDialogRef<HomePagePopupComponent>,
    @Inject(MAT_DIALOG_DATA) private content: [], //about, group1, group2, conductor
    )
  {
    console.log(this.content);
  }

  submit(){

  }
}
