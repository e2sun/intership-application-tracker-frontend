import { Component, Input, OnChanges } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { CommonModule } from '@angular/common';
import { Application } from '../../models/application.model';

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

  statusClass(status: string | undefined): string {
    if (!status) return '';
    const s = status.toLowerCase();
    if (s=="applied") return 'status-applied';
    if (s=="interview") return 'status-interview';
    if (s=="offer") return 'status-offer';
    if (s=="rejected") return 'status-rejected';
    return '';
  }

}
