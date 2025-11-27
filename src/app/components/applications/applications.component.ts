import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { FormsModule } from '@angular/forms';  
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = [];
  loading = false;
  error: string | null = null;

  constructor(private applicationService: ApplicationService) { }

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

  sortByNewest() {
    this.applications.sort((a, b) => {
      const dateA = new Date(a.dateApplied).getTime();
      const dateB = new Date(b.dateApplied).getTime();
      return dateB - dateA;
    });
  }

  sortByOldest() {
    this.applications.sort((a, b) => {
      const dateA = new Date(a.dateApplied).getTime();
      const dateB = new Date(b.dateApplied).getTime();
      return dateA - dateB;
    });
  }

  onStatusChange(app: Application){

    this.applicationService.updateApplication(app).subscribe({
      next: (saved) => {
        app.status = saved.status;
      },
      error: (err) => {
        console.error('Failed to update status', err);
        this.error = "Failed to update applications status";
      }
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

  deleteApplication(app: Application): void{
    if (!app.id) {
      console.error('Cannot delete application without id', app);
      return;
    }

    const companyName = app.company?.name || 'this company';

    // confirm dialog
    const confirmDelete = confirm(
      `Delete application "${app.roleTitle}" for "${companyName}"?`
    );
    if (!confirmDelete) return;

    this.applicationService.deleteApplication(app.id).subscribe({
      next:()=>{
        this.applications = this.applications.filter(a => a.id !== app.id);
      },
      error:(err)=> {
        console.error('Failed to delete application', err);
        this.error = 'Failed to delete application. Please try again.';
      }
    });
  }
   
}










