import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private homeUrl = '/api/get-content';

  constructor(private http: HttpClient) { }

  getContent() {
    return this.http.get<any>('/api/get-content');
  }

  updateContent(about: string, group1: string, group2: string, conductor: string){
    this.http.post('/api/post-content', [about, group1, group2, conductor]).subscribe();
  }
}
