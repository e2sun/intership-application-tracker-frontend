import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsListComponent } from '../applications-list/applications-list.component';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService
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

}
