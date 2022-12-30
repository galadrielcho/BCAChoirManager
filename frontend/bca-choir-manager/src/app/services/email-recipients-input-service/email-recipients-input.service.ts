import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailRecipientsInputService {
  private emailUrl = '/api/email-recipients-input';

  constructor(private http: HttpClient) { }

  getEmails() {
    return this.http.get<any>(this.emailUrl);
  }


}