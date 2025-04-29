import { Component } from '@angular/core';
import { DashboardComponent } from '@lib/dashboard/dashboard.component';
import { DocumentTemplateComponent } from '../../../components/document-template/document-template';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [
    DashboardComponent,
    DocumentTemplateComponent,
  ],
})
export class HomePageComponent {
}