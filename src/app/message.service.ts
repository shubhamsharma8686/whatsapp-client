// message.service.ts

import { Injectable } from '@angular/core';
import { Template } from './template.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiUrl = 'http://localhost:3000/api/data'; // API endpoint URL
  constructor(private http: HttpClient) { }

  generateMessage(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
