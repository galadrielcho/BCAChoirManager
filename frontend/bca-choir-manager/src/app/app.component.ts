import { Component, OnInit } from '@angular/core';
import { StatusService } from './services/status-service/status.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bca-choir-manager';
  status = 'DOWN';

  constructor(private statusService: StatusService) { }


  ngOnInit() {
    this.statusService.getStatus().subscribe({
      next: data => {
        console.log("Retrieved status: " + data.status);
        this.status = data.status;
      }
    }); 
  }

}
