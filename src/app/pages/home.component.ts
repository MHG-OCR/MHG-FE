import { Component } from '@angular/core';
import { PDFSnippingComponent } from '@lib/pdf-snap/pdf.snap.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    PDFSnippingComponent
  ],
})
export class HomePageComponent {
}