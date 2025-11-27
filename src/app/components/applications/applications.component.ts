import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = [];
  loading = false;
  error: string | null = null;

  constructor(private applicationService: ApplicationService){}

  ngOnInit(): void {
    this.fetchApplications();
  }
  
  fetchApplications(): void {
    this.loading = true;
    this.error = null;

    this.applicationService.getApplications().subscribe({
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
