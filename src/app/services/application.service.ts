import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../models/application.model';

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

    getApplicationsByCompany(companyId: number): Observable<Application[]>{
      const url = `${this.apiUrl}/companyId=${companyId}`
      return this.http.get<Application[]>(url);
    }

    // update application
    updateApplication(app: Application): Observable<Application>{ 
      const url = `${this.apiUrl}/${app.id}`;
      return this.http.put<Application>(url, app);
    }

    createApplication(application: Application): Observable<Application>{
      return this.http.post<Application>(this.apiUrl, application);
    }

}
