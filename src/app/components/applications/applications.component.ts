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

  pendingDeleteApp: Application | null = null;
  showConfirm = false;
  confirmMessage='';

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

  openDeleteConfirm(app: Application): void {
    if (!app.id) {
      console.error('Cannot delete application without id', app);
      return;
    }

    const companyName = app.company?.name || 'this company';
    this.pendingDeleteApp = app;
    this.confirmMessage =  `Delete application "${app.roleTitle}" for "${companyName}"?`;
    this.showConfirm = true;
  }

  confirmDelete(): void {
    if (!this.pendingDeleteApp || !this.pendingDeleteApp.id){
      this.showConfirm = false;
      return;
    }

    const id = this.pendingDeleteApp.id;

    if (id === undefined || id === null) {
      console.error('Cannot delete application without id', this.pendingDeleteApp);
      this.showConfirm = false;
      return;
    }

    this.applicationService.deleteApplication(id).subscribe({
      next:()=>{
        this.applications = this.applications.filter(a => a.id !== id);
        this.showConfirm = false;
        this.pendingDeleteApp = null;
      },
      error:(err)=> {
        console.error('Failed to delete application', err);
        this.error = 'Failed to delete application. Please try again.';
        this.showConfirm = false;
      }
    });
  }

  cancelDelete(): void {
    this.showConfirm = false;
    this.pendingDeleteApp = null;
  }
    
}
   











