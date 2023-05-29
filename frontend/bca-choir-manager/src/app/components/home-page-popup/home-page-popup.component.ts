import { C } from '@angular/cdk/keycodes';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HomeService } from 'src/app/services/home-service/home.service';

@Component({
  selector: 'app-home-page-popup',
  templateUrl: './home-page-popup.component.html',
  styleUrls: ['./home-page-popup.component.css'],
})
export class HomePagePopupComponent {

  about = "";
  group1 = "";
  group2 = "";
  conductor = "";
  
  contentForm = new FormGroup({
    about: new FormControl('', 
                              [Validators.required,
                              Validators.pattern('[a-zA-Z -/]*'),
                              Validators.maxLength(16777215)]),
    group1: new FormControl('', 
                              [Validators.required,
                              Validators.pattern('[a-zA-Z -/]*'),
                              Validators.maxLength(16777215)]),
    group2 : new FormControl('',
                              [Validators.required,
                                Validators.pattern('[a-zA-Z -/]*'),
                              Validators.maxLength(16777215)]
                              ),
    conductor : new FormControl('',
                              [Validators.required,
                                Validators.pattern('[a-zA-Z -/]*'),
                              Validators.maxLength(16777215)]) 
  });

  constructor(
    private service: HomeService, private dialogRef: MatDialogRef<HomePagePopupComponent>)
  {
    this.service.getContent().subscribe({
      next: data => {
        this.about = data.content[0].info;
        this.group1 = data.content[1].info;
        this.group2 = data.content[2].info;
        this.conductor = data.content[3].info;
      }      
      });
  }

  submit(){
    this.service.updateContent(this.about, this.group1, this.group2, this.conductor);
    this.dialogRef.close();
  }
}
