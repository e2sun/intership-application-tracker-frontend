import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Application } from '../../models/application.model';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-create-application',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './create-application.component.html',
  styleUrl: './create-application.component.css'
})
export class CreateApplicationComponent implements OnInit {

  newApplication: Application = {
    roleTitle: '',
    dateApplied: '',
    status: '',
    portalLink: '',
    notes: '',
    company: undefined
  };

  companies: Company[] = [];
  selectedCompanyId: number | null = null;

  private returnToCompanyId: number |  null = null;

  loading = false;
  error: string | null = null;

  constructor(
    private applicationService: ApplicationService,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchCompanies();

    this.route.queryParamMap.subscribe(params => {
      const companyIdParam = params.get('companyId');
      if (companyIdParam) {
        const id = Number(companyIdParam);
        if (!isNaN(id)){
          this.selectedCompanyId = id;
          this.returnToCompanyId = id;
        }
      }
    })
  }

  fetchCompanies(): void {
    this.loading = true;
    this.error = null;

    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;
        this.sortCompanies();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching companies', err);
        this.error = 'Failed to load companies';
        this.loading = false;
      },
    });
  }

  sortCompanies() {
    this.companies.sort((a, b) => {
      const nameA = (a.name || '').toLowerCase();
      const nameB = (b.name || '').toLowerCase();
      return nameA.localeCompare(nameB);   // A–Z
    })
  }

  onSubmit(): void {
    if (!this.selectedCompanyId) {
      this.error = "Company is required.";
      return;
    }

    if (!this.newApplication.roleTitle.trim()) {
      this.error = "Role title is required.";
      return;
    }
    this.loading = true;
    this.error = null;

    // build payload with company id only
    const payload: Application = {
      ...this.newApplication,
      company: { id: this.selectedCompanyId } as Company
    };

    this.applicationService.createApplication(payload).subscribe({
      next: () => {
        this.loading = false;

        if (this.returnToCompanyId) {
          this.router.navigate(['/companies', this.returnToCompanyId]);
        } else{
          this.router.navigate(['/applications']);
        }
      },
      error: (err) => {
        console.error('Failed to create application', err);
        this.error = 'Failed to create application. Please try again.';
        this.loading = false;
      }
    });
  }
}
