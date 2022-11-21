import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('username') input: ElementRef<HTMLInputElement> | undefined;  
  submitClicked(){
    console.log(this.input?.nativeElement.value);

    
  }
  
}
