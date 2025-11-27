import { Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { CreateApplicationComponent } from './components/create-application/create-application.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    //dashboard page
    { path: 'dashboard', component: DashboardComponent },

    //companies list page
    { path: 'companies', component: CompanyComponent },

    // company detail page
    { path: 'companies/:id', component: CompanyDetailComponent },

    // applications list page
    { path: 'applications', component: ApplicationsComponent },

    // create company page
    { path: 'create-company', component: CreateCompanyComponent },

    // create application page
    { path: 'create-application', component: CreateApplicationComponent },

    // fallback
    { path: '**', redirectTo: 'dashboard' }
];
