import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { CommonModule } from '@angular/common';   
import { Company } from './company.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Internship Application Tracker';
  companies: Company[] = [];
  loading = false;
  error: string | null = null;

  constructor(private companyService: CompanyService){}

  ngOnInit(): void {
    this.fetchCompanies();
  }

  // call service 
  fetchCompanies(): void {
    this.loading = true;
    this.error = null;

    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching companies', err);
        this.error = 'Failed to load companies';
        this.loading = false;
      },
    });
  }

}
