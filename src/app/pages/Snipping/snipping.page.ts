import { Component } from '@angular/core';
import { PDFSnippingComponent } from '@lib/pdf-snap/pdf.snap.component';

@Component({
  selector: 'app-snipping-page',
  templateUrl: './snipping.page.html',
  standalone: true,
  imports: [
    PDFSnippingComponent
  ],
})
export class SnippingPageComponent {
}