import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NgxExtendedPdfViewerModule, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-pdf-snipping',
  templateUrl: './pdf.snap.component.html',
  styleUrls: ['./pdf.snap.component.less'],
  standalone: true,
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule
  ]
})
export class PDFSnippingComponent implements OnInit {
  pdfSrc: string | ArrayBuffer = '';
  isSelectionActive = false;
  selectionStyle: { [key: string]: string } = {};
  startX = 0;
  startY = 0;
  isDragMode = false;

  coordsList: Array<{
    topLeft: { x: number, y: number },
    topRight: { x: number, y: number },
    bottomRight: { x: number, y: number },
    bottomLeft: { x: number, y: number }
  }> = [];

  @ViewChild('selectionBox') selectionBox!: ElementRef<HTMLDivElement>;
  @ViewChild('pdfContainer') pdfContainer!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    pdfDefaultOptions.assetsFolder = 'assets';
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
      }

      this.pdfSrc = URL.createObjectURL(file);
    }
  }

  toggleDragMode(): void {
    this.isDragMode = !this.isDragMode;
    if (!this.isDragMode) {
      this.isSelectionActive = false;
      this.selectionStyle = {};
    }
  }

  onMouseDown(event: MouseEvent): void {
    if (!this.isDragMode || !this.pdfSrc) return;

    this.isSelectionActive = true;
    const rect = this.pdfContainer.nativeElement.getBoundingClientRect();

    this.startX = event.clientX - rect.left;
    this.startY = event.clientY - rect.top;

    this.selectionStyle = {
      left: `${this.startX}px`,
      top: `${this.startY}px`,
      width: '0px',
      height: '0px'
    };
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isSelectionActive) return;

    const rect = this.pdfContainer.nativeElement.getBoundingClientRect();
    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;

    const x = Math.min(this.startX, currentX);
    const y = Math.min(this.startY, currentY);
    const width = Math.abs(currentX - this.startX);
    const height = Math.abs(currentY - this.startY);

    this.selectionStyle = {
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`
    };
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.isSelectionActive) return;

    const rect = this.pdfContainer.nativeElement.getBoundingClientRect();
    const endX = event.clientX - rect.left;
    const endY = event.clientY - rect.top;

    // Calculate the corner coordinates
    const x1 = Math.min(this.startX, endX);
    const y1 = Math.min(this.startY, endY);
    const x2 = Math.max(this.startX, endX);
    const y2 = Math.max(this.startY, endY);

    const coords = {
      topLeft: { x: x1, y: y1 },
      topRight: { x: x2, y: y1 },
      bottomRight: { x: x2, y: y2 },
      bottomLeft: { x: x1, y: y2 }
    };

    this.coordsList.push(coords);
    console.log('Selection corners:', coords);

    this.isSelectionActive = false;
  }

  removeSelection(index: number): void {
    this.coordsList.splice(index, 1);
  }

  clearAllSelections(): void {
    this.coordsList = [];
  }

  saveSelections(): void {
    console.log('Saving selections:', this.coordsList);
    alert(`Saved ${this.coordsList.length} selections for processing`);
  }
}