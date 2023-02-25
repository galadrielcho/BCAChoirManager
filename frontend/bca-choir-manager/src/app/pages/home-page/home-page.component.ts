import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AccountService} from '../../services/account-service/account.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {
  constructor(private accountService: AccountService, public auth: AuthService) { }

  @ViewChild('username') input: ElementRef<HTMLInputElement> | undefined;  
  submitClicked(){
    var text: string = "placeholder";
    text = String(this.input?.nativeElement.value);
    const myArray: string[] = text.split(";");
    this.accountService.postStatus(myArray).subscribe({});
  }
  
}