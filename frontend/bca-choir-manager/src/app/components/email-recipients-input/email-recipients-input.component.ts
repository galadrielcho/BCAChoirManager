import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


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

  constructor() {
    this.filteredEmails = this.emailCtrl.valueChanges.pipe(
      startWith(null),
      map((email: string | null) => (email ? this._filter(email) : this.allEmails.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our email
    if (value) {
      this.emails.push(value);
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
