import { Component, OnInit } from '@angular/core';
import { Company } from './company.model';  
import { CompanyService } from './company.service';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

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

    constructor(private companyService: CompanyService){}

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
            this.loading = false;
        },
        error: (err) => {
            console.error('Error fetching companies', err);
            this.error = 'Failed to load companies';
            this.loading = false;
        },
        });
    }

}
