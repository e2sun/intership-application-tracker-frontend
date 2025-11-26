import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { CompanyService } from '../company/company.service';
import { ApplicationService } from '../applications-list/application.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  totalCompanies = 0;
  totalApplications = 0;

  loading = false;
  error: string | null = null;

  constructor(
    private companyService: CompanyService,
    private applicationService: ApplicationService
  ){}

  ngOnInit(){
    this.loadCounts();
  }

  loadCounts(): void {
    this.loading = true;
    this.error = null;

    // get companies count
    this.companyService.getCompanies().subscribe({
      next:(companies) => {
        this.totalCompanies = companies.length;
      },
      error: (err) => {
        console.error('Error fetching companies for dashboard', err);
        this.error = 'Failed to load dashboard data';
        this.loading = false;
      }
    });

    // get applications count
    this.applicationService.getApplications().subscribe({
      next:(applications) => {
        this.totalApplications = applications.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching companies for dashboard', err);
        this.error = 'Failed to load dashboard data';
        this.loading = false;
      }
    });

  }



}
