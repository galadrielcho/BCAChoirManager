import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AccountService} from '../../services/account-service/account.service';
import { MatDialog } from '@angular/material/dialog';
import { SignUpService } from 'src/app/services/sign-up-service/sign-up.service';
import { SignUpComponent } from 'src/app/components/sign-up/sign-up.component';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { SlideInterface } from 'src/app/components/photo-slideshow/types/slides.interface';
import { HomePagePopupComponent } from 'src/app/components/home-page-popup/home-page-popup.component';
import { HomeService } from 'src/app/services/home-service/home.service';
import { ErrorService } from 'src/app/services/error-service/error.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {
  dialog: MatDialog;
  isUnaccounted: Boolean
  dbCalled: Boolean
  about : string = "";
  group1 : string = "";
  group2: string = "";
  conductor: string = "";
  slides: SlideInterface[] =[{url:"https://drive.google.com/uc?id=1UFaijjx-FKsIRFFldtyvvkYegoPaQZn4", title: 'photo'},
                             {url:"https://drive.google.com/uc?id=1l8WBnO5IYXYUdfMkhq2yS1r_cfNLZGCJ", title: 'photo'},
                             {url:"https://drive.google.com/uc?id=1KWVS7M-Dt8x9qekZ4vvBYZcOrUECid86", title: 'photo'},
                             {url:"https://drive.google.com/uc?id=1rwzN64eWQPAJcfrZuMM1_8UjJSHCzX4m", title: 'photo'},];
  constructor(private errorService: ErrorService, private homeService: HomeService, private accountService: AccountService, private md: MatDialog, private signUpService: SignUpService, private auth : AuthenticationService, private authService: AuthenticationService) {
    this.dialog = md;
    this.isUnaccounted = false;
    this.dbCalled = false;
    this.updateContent();

  }

  @ViewChild('username') input: ElementRef<HTMLInputElement> | undefined;  
  submitClicked(){
    var text: string = "placeholder";
    text = String(this.input?.nativeElement.value);
    const myArray: string[] = text.split(";");
    this.accountService.postStatus(myArray).subscribe({});
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  updateContent(){
    this.homeService.getContent().subscribe({
      next: data => {
        this.about = data.content[0].info;
        this.group1 = data.content[1].info;
        this.group2 = data.content[2].info;
        this.conductor = data.content[3].info;
      },
      error: error=>{
        this.errorService.showErrorDialog("Could not retrieve text content from database.")
      }     
      });
  }


  inDatabase() {
    let email = this.auth.getUserEmail();
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
      this.dialog.open(SignUpComponent, {disableClose: true});
      this.signUpService.send(this.dialog, location, email);
    }
  }

  edit(){
    this.dialog.open(HomePagePopupComponent).afterClosed().subscribe(() => {
      this.updateContent();
    });  
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
  
}