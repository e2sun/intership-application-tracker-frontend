import { Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';

export const routes: Routes = [
    {path: '', redirectTo: 'companies', pathMatch: 'full'},
    
    //companies list page
    {path: 'companies', component: CompanyComponent },

    // company detail page
    {path: 'companies/:id', component: CompanyDetailComponent},


    // fallback
    { path: '**', redirectTo: 'companies' }   
];
