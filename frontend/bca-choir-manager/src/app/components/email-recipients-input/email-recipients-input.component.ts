import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {EmailRecipientsInputService} from '../../services/email-recipients-input-service/email-recipients-input.service';


@Component({
  selector: 'email-recipients-input',
  templateUrl: 'email-recipients-input.component.html',
  styleUrls: ['email-recipients-input.component.css'],
})
export class EmailRecipientsInputComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  emailCtrl = new FormControl('');
  filteredEmails: Observable<string[]>;
  emails: string[] = [];
  allEmails: string[] = ['Chamber Choir', 'Concert Choir', 'Altos', 'Sopranos', 'Tenors'];

  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  constructor(private emailService: EmailRecipientsInputService) {
    this.filteredEmails = this.emailCtrl.valueChanges.pipe(
      startWith(null),
      map((email: string | null) => (email ? this._filter(email) : this.allEmails.slice())),
    );
    console.log(this.emails);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our email
    if (value) {
      this.emailService.getEmails().subscribe({
        next: data => {
          for(let i = 0; i < data.emails.length; i++){
            if(data.emails[i][2] === value){
              this.emails.push(value);
              break;
            }
          }

          if (value.includes(" ")) {
            var split = value.split(" "); //split into first and last name
            for(let i = 0; i < data.emails.length; i++){
              if(data.emails[i][0] === split[0]){ //first names equal
                if(data.emails[i][1] === split[1]){ //last names equal
                  this.emails.push(data.emails[i][2]);
                }
              }
            }
          }
          console.log(this.emails);
        }
      }); 
    }
    // Clear the input value
    event.chipInput!.clear();

    this.emailCtrl.setValue(null);
  }

  remove(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.emails.push(event.option.viewValue);
    this.emailInput.nativeElement.value = '';
    this.emailCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allEmails.filter(email => email.toLowerCase().includes(filterValue));
  }
}
