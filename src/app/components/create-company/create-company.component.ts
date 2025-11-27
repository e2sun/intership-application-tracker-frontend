import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent {

  newCompany: Company = {
    name: '',
    location: '',
    website: '',
    notes:''
  };
  
  loading = false;
  error: string | null = null;

  constructor(private companyService: CompanyService, private router: Router){}

  onSubmit(): void {
    if (!this.newCompany.name.trim()) {
      this.error = "Company name is required.";
      return;
    }
    this.loading = true;
    this.error = null;

    this.companyService.createCompany(this.newCompany).subscribe({
      next: (created) => {
        this.loading = false;
        this.router.navigate(['/companies']);   
      },
      error: (err) => {
        console.error('Failed to create company', err);
        this.error = 'Failed to create company. Please try again.';
        this.loading = false;
      }
    });
  }
}
