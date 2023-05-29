import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VoicepartLimit } from 'src/app/models/voicepart-limit.model';
import { EventService } from 'src/app/services/event-service/event.service';
import {ErrorService} from '../../services/error-service/error.service'

@Component({
  selector: 'app-new-voicepart-maximum-dialog',
  templateUrl: './new-voicepart-maximum-dialog.component.html',
  styleUrls: ['./new-voicepart-maximum-dialog.component.css']
})
export class NewVoicepartMaximumDialogComponent {
  public voicepartLimit;
  public event;
  public maximumForm : FormGroup = new FormGroup({
    maximum: new FormControl(1,
                              [Validators.required])});

  constructor(   
    public dialogRef: MatDialogRef<NewVoicepartMaximumDialogComponent>,
    private eventService : EventService,
   @Inject(MAT_DIALOG_DATA) data : any,
   private errorService : ErrorService ){
    this.voicepartLimit = data.limit;
    this.event = data.event;
    
    let max = this.voicepartLimit.maximum;
    if (max == null){
      max = 1;
    }
    this.maximumForm.patchValue({maximum: max});
}

  updateVoicepartLimit(){
    if (this.voicepartLimit.maximum == null){
      this.voicepartLimit.maximum = this.maximumForm.value.maximum;
      this.eventService.addVoicepartLimit(this.event, this.voicepartLimit).subscribe({
        error: ()=> this.errorService.showErrorDialog("Could not add voicepart limit to database")
      });

    }
    else {
      this.voicepartLimit.maximum = this.maximumForm.value.maximum;
      this.eventService.updateVoicepartLimit(this.event, this.voicepartLimit).subscribe({
        error: ()=> this.errorService.showErrorDialog("Could not add voicepart limit to database")
      });
    }

    this.dialogRef.close();
  }

}
