import { Component, OnInit, HostListener } from '@angular/core';
import { StatusService } from './services/status-service/status.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bca-choir-manager';
  status = 'DOWN';
  currentWindowWidth: number = 0;

  constructor(private statusService: StatusService) { }


  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.currentWindowWidth = window.innerWidth;
  }

  ngOnInit() {
    this.currentWindowWidth = window.innerWidth;

    this.statusService.getStatus().subscribe({
      next: data => {
        this.status = data.status;
      }
    }); 
  }

}
