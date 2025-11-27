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

  applied=0;
  interviewing=0;
  offers=0;
  rejected=0;

  topCompanies: {name: string; count: number}[] = [];

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

    // get applications count and compute stats
    this.applicationService.getApplications().subscribe({
      next:(applications) => {
        this.totalApplications = applications.length;

        this.applied = applications.filter(a=>a.status.toLowerCase()==='applied').length;
        this.interviewing = applications.filter(a=>a.status.toLowerCase()==='interview').length;
        this.offers = applications.filter(a=>a.status.toLowerCase()==='offer').length;
        this.rejected = applications.filter(a=>a.status.toLowerCase()==='rejected').length;

        // compute top companies
        const companyCount: Record<string, number>={};
        applications.forEach(a=>{
          const name = a.company?.name || 'Unknown';
          companyCount[name] = (companyCount[name] || 0) + 1;
        });

        this.topCompanies = Object.entries(companyCount)
          .map(([name, count]) => ({ name, count }))
          .sort((a,b) => b.count - a.count)
          .slice(0,3);

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
