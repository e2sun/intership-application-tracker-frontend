import { Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApplicationsComponent } from './components/applications/applications.component';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    
    //dashboard page
    {path: 'dashboard', component: DashboardComponent},

    //companies list page
    {path: 'companies', component: CompanyComponent },

    // company detail page
    {path: 'companies/:id', component: CompanyDetailComponent},

    {path: 'applications', component: ApplicationsComponent},

    // fallback
    { path: '**', redirectTo: 'dashboard' }   
];
