import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AccountService} from '../services/account-service/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private accountService: AccountService) { }

  @ViewChild('username') input: ElementRef<HTMLInputElement> | undefined;  
  submitClicked(){
    var text: string = "placeholder";
    text = String(this.input?.nativeElement.value);
    const myArray: string[] = text.split(";");
    this.accountService.postStatus(myArray).subscribe({});
  }
  
}
