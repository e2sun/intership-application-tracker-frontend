import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { ApplicationsListComponent } from './applications-list/applications-list.component';

@Component({
  selector: 'app-root',
  imports: [ 
    RouterOutlet,
    CompanyComponent,
    ApplicationsListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Internship Application Tracker';
}