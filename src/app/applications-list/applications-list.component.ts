import { Component, OnInit } from '@angular/core';
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

export class ApplicationsListComponent implements OnInit{
  applications: Application[] = [];
  loading = false;
  error: string | null = null;

  constructor(private applicationService: ApplicationService){}

  ngOnInit(): void {
    this.fetchApplications();
  }

  // call service 
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
