import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company.model';  
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterModule,
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit {
    companies: Company[] = [];
    loading = false;
    error: string | null = null;

    constructor(
        private companyService: CompanyService
    ){}

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
        this.companies.sort((a,b)=>{
            const nameA = (a.name || '').toLowerCase();
            const nameB = (b.name || '').toLowerCase();
            return nameA.localeCompare(nameB);   // A–Z
        })
    }

    onDeleteCompany(company:Company, event: MouseEvent): void {

        event.stopPropagation();
        event.preventDefault();
        
        if (!company.id) {
            console.error('Cannot delete company without id', company);
            return;
        }

        const confirmed = confirm(`Delete company "${company.name}" and all its applications?`);

        if (!confirmed) return;

        this.companyService.deleteCompany(company.id).subscribe({
            next: () => {
                this.companies = this.companies.filter(c => c.id !== company.id);
            },
            error: (err) => {
                console.error('Failed to delete company', err);
                this.error = 'Failed to delete company. Please try again.';
            }
        })
    }

}
