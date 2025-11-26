import { Component, Input, OnChanges } from '@angular/core';
import { Application } from './application.model';
import { ApplicationService } from './application.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './applications-list.component.html',
  styleUrl: './applications-list.component.css'
})

export class ApplicationsListComponent implements OnChanges{
  @Input() companyId!: number;

  applications: Application[] = [];
  loading = false;
  error: string | null = null;

  constructor(private applicationService: ApplicationService){}

  ngOnChanges(): void {
    if (this.companyId){
      this.fetchApplications();
    }
  }

  // call service 
  fetchApplications(): void {
    this.loading = true;
    this.error = null;

    this.applicationService.getApplicationsByCompany(this.companyId).subscribe({
    next: (data) => {
        this.applications = data;
        this.loading = false;
    },
    error: (err) => {
        console.error('Error fetching applications', err);
        this.error = 'Failed to load applications';
        this.loading = false;
    },
    });
  }

}
