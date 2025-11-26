import { Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    
    //dashboard page
    {path: 'dashboard', component: DashboardComponent},

    //companies list page
    {path: 'companies', component: CompanyComponent },

    // company detail page
    {path: 'companies/:id', component: CompanyDetailComponent},


    // fallback
    { path: '**', redirectTo: 'dashboard' }   
];
