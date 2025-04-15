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

  // Updated to include a color property and unique ID for each selection
  coordsList: Array<{
    id: number,
    topLeft: { x: number, y: number },
    topRight: { x: number, y: number },
    bottomRight: { x: number, y: number },
    bottomLeft: { x: number, y: number },
    color: string
  }> = [];

  // Counter for generating unique IDs
  private nextId = 1;

  // Array of colors to cycle through for selections
  private selectionColors = [
    'rgba(255, 99, 71, 0.3)',   // Tomato
    'rgba(30, 144, 255, 0.3)',  // DodgerBlue
    'rgba(60, 179, 113, 0.3)',  // MediumSeaGreen
    'rgba(255, 165, 0, 0.3)',   // Orange
    'rgba(238, 130, 238, 0.3)', // Violet
    'rgba(106, 90, 205, 0.3)',  // SlateBlue
    'rgba(250, 128, 114, 0.3)', // Salmon
    'rgba(95, 158, 160, 0.3)'   // CadetBlue
  ];

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
      // Clear any existing selections when a new file is loaded
      this.coordsList = [];
      this.nextId = 1;
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

    // Don't add if it's too small (probably an accidental click)
    if (Math.abs(x2 - x1) < 10 || Math.abs(y2 - y1) < 10) {
      this.isSelectionActive = false;
      return;
    }

    // Choose a color for this selection (cycle through colors)
    const colorIndex = (this.nextId - 1) % this.selectionColors.length;
    const selectionColor = this.selectionColors[colorIndex];

    const coords = {
      id: this.nextId++,
      topLeft: { x: x1, y: y1 },
      topRight: { x: x2, y: y1 },
      bottomRight: { x: x2, y: y2 },
      bottomLeft: { x: x1, y: y2 },
      color: selectionColor
    };

    this.coordsList.push(coords);
    console.log('Selection corners:', coords);

    this.isSelectionActive = false;
  }

  getSelectionStyle(coords: any): { [key: string]: string } {
    return {
      left: `${coords.topLeft.x}px`,
      top: `${coords.topLeft.y}px`,
      width: `${coords.topRight.x - coords.topLeft.x}px`,
      height: `${coords.bottomLeft.y - coords.topLeft.y}px`,
      backgroundColor: coords.color,
      border: `2px solid ${coords.color.replace('0.3', '0.8')}`
    };
  }

  highlightSelection(index: number): void {
    // Find the element and scroll it into view
    setTimeout(() => {
      const element = document.getElementById(`selection-${this.coordsList[index].id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add a temporary highlight effect
        element.classList.add('highlight-pulse');
        setTimeout(() => {
          element.classList.remove('highlight-pulse');
        }, 1500);
      }
    }, 100);
  }

  removeSelection(index: number): void {
    this.coordsList.splice(index, 1);
  }

  clearAllSelections(): void {
    this.coordsList = [];
    this.nextId = 1;
  }

  saveSelections(): void {
    console.log('Saving selections:', this.coordsList);
    alert(`Saved ${this.coordsList.length} selections for processing`);
  }
  
}