import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsListComponent } from '../applications-list/applications-list.component';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Company } from '../../models/company.model';


@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [ CommonModule, RouterModule, ApplicationsListComponent ],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.css'
})
export class CompanyDetailComponent implements OnInit{

  companyId!: number;
  company: Company | null = null;

  loading = false;
  error: string | null = null;

  pendingDeleteCompany: Company | null = null;
  showConfirm = false;
  confirmMessage='';

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.companyId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCompany();
  }
  
  loadCompany(): void {
    this.loading = true;
    this.error =  null;

    this.companyService.getCompany(this.companyId).subscribe({
      next: (data) => {
        this.company = data;
        this.loading = false;
      },
      error: (err) => {
          console.error('Error fetching company', err);
          this.error = 'Failed to load company';
          this.loading = false;
      },
    })
  }

  openDeleteConfirm(company: Company): void {
    if (!this.companyId) {
      console.error('Cannot delete company without id', company);
      return;
    }

    this.pendingDeleteCompany = company;
    this.confirmMessage =  `Delete company "${company.name}" and all its applications?`;
    this.showConfirm = true;
  }


  confirmDelete(): void {
    if (!this.pendingDeleteCompany || !this.pendingDeleteCompany.id){
      this.showConfirm = false;
      return;
    }

    const id = this.pendingDeleteCompany.id;

    if (id === undefined || id === null) {
      console.error('Cannot delete company without id', this.pendingDeleteCompany);
      this.showConfirm = false;
      return;
    }

    this.companyService.deleteCompany(id).subscribe({
      next:()=>{
        this.showConfirm = false;
        this.pendingDeleteCompany = null;
        this.router.navigate(['/companies']);
      },
      error:(err)=> {
        console.error('Failed to delete company', err);
        this.error = 'Failed to delete company. Please try again.';
        this.showConfirm = false;
      }
    });

  }

  cancelDelete(): void {
    this.showConfirm = false;
    this.pendingDeleteCompany = null;
  }
    
}
   












  


