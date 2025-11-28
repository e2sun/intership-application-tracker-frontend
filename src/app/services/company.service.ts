import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = 'http://localhost:8080/api/companies';

  constructor( private http: HttpClient) { }

  // fetch list of companies from backend
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  getCompany(id: number): Observable<Company> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Company>(url)
  }

  createCompany(company: Company): Observable<Company>{
    return this.http.post<Company>(this.apiUrl, company);
  }

  // deleteCompany
  deleteCompany(id: number){
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<void>(url);
  }

}

