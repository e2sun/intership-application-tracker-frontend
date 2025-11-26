import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from './application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = 'http://localhost:8080/api/applications';
  
  constructor(private http: HttpClient) { }

    // fetch list of applications from backend
    getApplications(): Observable<Application[]> {
        return this.http.get<Application[]>(this.apiUrl);
    }
  
}
