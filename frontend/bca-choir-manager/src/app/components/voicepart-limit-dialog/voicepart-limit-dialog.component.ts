import { Component, Inject, OnInit, ViewChild, ElementRef} from '@angular/core';
import { MatTable, MatTableDataSource} from '@angular/material/table';
import { VoicepartLimit } from 'src/app/models/voicepart-limit.model';
import { SignupCount } from 'src/app/models/signup-count.model';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { EventData } from '../../models/event-data.model'
import {EventService} from '../../services/event-service/event.service'
import {ErrorService} from '../../services/error-service/error.service'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Validators } from '@angular/forms';
import { Token } from '@angular/compiler';
import { NewVoicepartMaximumDialogComponent } from '../new-voicepart-maximum-dialog/new-voicepart-maximum-dialog.component';
import { N } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-voicepart-limit-dialog',
  templateUrl: './voicepart-limit-dialog.component.html',
  styleUrls: ['./voicepart-limit-dialog.component.css']
})
export class VoicepartLimitDialogComponent {
  public numbers : number[] = [1, 2];
  public voiceparts : string[] = ["soprano", "alto", "tenor", "bass"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<VoicepartLimit>;
  dataSource: MatTableDataSource<VoicepartLimit> = new MatTableDataSource<VoicepartLimit>([]);

  public limitForm : FormGroup = new FormGroup({
    voicepart_name: new FormControl('soprano', 
                              [Validators.required]),
    number: new FormControl(1, [Validators.required]),
    maximum: new FormControl('1', 
                              [Validators.required])});

    displayedColumns: string[] = ["voicepart", "maximum", "edit", "delete"];
    private voicepartLimit: VoicepartLimit[] = [];

      constructor(   
         public dialogRef: MatDialogRef<VoicepartLimitDialogComponent>,
        public dialog : MatDialog,
        @Inject(MAT_DIALOG_DATA) private orig_event: EventData,
        private eventService : EventService,
        private errorService : ErrorService){
      
      this.eventService.getVoicepartLimit(this.orig_event).subscribe({
        next: data => {
        this.voicepartLimit = data;
        this.dataSource = new MatTableDataSource(this.voicepartLimit);
        this.table.dataSource = this.dataSource;

        }
      });

    }

    voicepartLimitExists() : boolean {
      let i = 0;
      let currentData = this.dataSource.data;
      let formData = this.limitForm.value;
  
      for (i = 0; i< currentData.length; i++){
        console.log("current data[i]");
      console.log(currentData[i]);
        if (formData.voicepart_name === currentData[i].voicepart_name
          && formData.number == currentData[i].number)
          return true;
      }
      return false;
    }

    openNewMaximumDialog(limit : VoicepartLimit){
      const dialogRef = this.dialog.open(NewVoicepartMaximumDialogComponent, {
        width: '300px',
        data: {limit:limit, event:this.orig_event}}
      );    
    
    }

    deleteVoicepartLimit(limit: VoicepartLimit){
      this.eventService.deleteVoicepartLimit(this.orig_event, limit).subscribe({
        error: ()=>{
          this.errorService.showErrorDialog("Could not delete voicepart limit from database.");
        }
      });
      const index = this.dataSource.data.indexOf(limit);
      if (index > -1) { 
        this.dataSource.data.splice(index, 1); 
      }
      this.table.renderRows();
    }

    addLimitToTable() : void{

      if (this.voicepartLimitExists()){
        this.errorService.showErrorDialog("Voicepart limit already exists for this part. Please edit it in the table.");
      }
      else {
        let i = 0;
        let newData = this.limitForm.value;
    
        this.dataSource.data.push(newData);

        this.eventService.addVoicepartLimit(this.orig_event, newData).subscribe({
          error: ()=> this.errorService.showErrorDialog("Could not add voicepart limit to database")
        });

        this.table.renderRows();
      }
  
    }
}
