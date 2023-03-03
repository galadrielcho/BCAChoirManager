import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AccountService} from '../../services/account-service/account.service';
import { AuthService } from '@auth0/auth0-angular';
import { MatDialog } from '@angular/material/dialog';
import { SignUpService } from 'src/app/services/sign-up-service/sign-up.service';
import { SignUpComponent } from 'src/app/sign-up/sign-up.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {
  dialog: MatDialog;
  signUpService: SignUpService
  isUnaccounted: Boolean
  dbCalled: Boolean
  constructor(private accountService: AccountService, public auth: AuthService, private md: MatDialog, private sus: SignUpService) {
    this.dialog = md;
    this.signUpService = sus;
    this.isUnaccounted = false;
    this.dbCalled = false;
  }

  @ViewChild('username') input: ElementRef<HTMLInputElement> | undefined;  
  submitClicked(){
    var text: string = "placeholder";
    text = String(this.input?.nativeElement.value);
    const myArray: string[] = text.split(";");
    this.accountService.postStatus(myArray).subscribe({});
  }
  inDatabase(email: string|undefined){
    //check if email is in database, if so return true
    if(this.dbCalled == false){ // db hasn't been accessed yet
      this.dbCalled = true;
      this.signUpService.getEmail(email).subscribe({
        next: data => {
          if(data.details == undefined){
            this.isUnaccounted = true;
          }
          else{
          }
        }      
      }); 
    }
    // db was checked, and email wasn't in db
    if(this.isUnaccounted){ 
      this.isUnaccounted = false;
      this.dialog.open(SignUpComponent);
      this.signUpService.send(this.dialog, location, email);
    }
  }
  
}