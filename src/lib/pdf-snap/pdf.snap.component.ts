import { CommonModule } from '@angular/common';
import {Component, ElementRef, ViewChild, OnInit, Input} from '@angular/core';
import { NgxExtendedPdfViewerModule, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import {TablelibComponent} from "@lib/table-lib/table-lib.component";
import { iTableLibAbstract, iTableLibActionsArgs, iTableLibIsEmptyArgs,  } from "@lib/table-lib/interface";
import {Router} from "@angular/router";
import {FileEndpoints} from "../../service/Endpoints/FileEndpoints";
import {iCoordinatesReq, Point} from "../../service/Endpoints/Interfaces";
import { OnChanges, SimpleChanges } from '@angular/core'

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
export class PDFSnippingComponent implements OnInit, OnChanges {
  pdfSrc: string | ArrayBuffer = '';
  isSelectionActive = false;
  selectionStyle: { [key: string]: string } = {};
  startX = 0;
  startY = 0;
  isDragMode = false;

  coordsList: Array<{
    id: number,
    topLeft: { x: number, y: number },
    topRight: { x: number, y: number },
    bottomRight: { x: number, y: number },
    bottomLeft: { x: number, y: number },
    color: string
  }> = [];

  private nextId = 1;

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

  @Input()
  _isEmpty?: iTableLibIsEmptyArgs;
  @Input() DocumentTemplate?: string | ArrayBuffer;


  ngOnInit(): void {
    pdfDefaultOptions.assetsFolder = 'assets';
    /*
    getCoordinates(id/fileName)
    displayCoordinates
     */

    if (this.DocumentTemplate) {
      this.pdfSrc = this.DocumentTemplate;
      this.findPdfViewerElement();
    }
  }
  constructor(private readonly _Router: Router,
              private _fileEndpointsService: FileEndpoints) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['DocumentTemplate'] && changes['DocumentTemplate'].currentValue) {
      this.pdfSrc = changes['DocumentTemplate'].currentValue;
      this.findPdfViewerElement(); // Optional: if needed for delayed rendering
    }
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
      this.coordsList = [];
      this.nextId = 1;
      this.findPdfViewerElement();
    }
  }

  toggleDragMode(): void {
    this.isDragMode = !this.isDragMode;
    if (!this.isDragMode) {
      this.isSelectionActive = false;
      this.selectionStyle = {};
    }
  }
  ngOnDestroy() {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
  }
  onMouseDown(event: MouseEvent): void {
    if (!this.isDragMode || !this.pdfSrc) return;

    this.isSelectionActive = true;
    const containerRect = this.pdfContainer.nativeElement.getBoundingClientRect();

    // Find the PDF viewer element to get its offset
    const pdfViewer = document.querySelector('.pdfViewer');
    const pdfRect = pdfViewer ? pdfViewer.getBoundingClientRect() : containerRect;

    // Calculate the offset between container and PDF content
    const offsetX = pdfRect.left - containerRect.left;
    const offsetY = pdfRect.top - containerRect.top;

    // Adjust starting coordinates with the offset
    this.startX = event.clientX - containerRect.left - offsetX;
    this.startY = event.clientY - containerRect.top - offsetY;

    this.selectionStyle = {
      left: `${this.startX}px`,
      top: `${this.startY}px`,
      width: '0px',
      height: '0px'
    };
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isSelectionActive) return;

    const containerRect = this.pdfContainer.nativeElement.getBoundingClientRect();
    const pdfViewer = document.querySelector('.pdfViewer');
    const pdfRect = pdfViewer ? pdfViewer.getBoundingClientRect() : containerRect;

    const offsetX = pdfRect.left - containerRect.left;
    const offsetY = pdfRect.top - containerRect.top;

    // Apply the same offset calculations as in onMouseDown and onMouseUp
    const currentX = event.clientX - containerRect.left - offsetX;
    const currentY = event.clientY - containerRect.top - offsetY;

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
    console.log('Mouse movement - Current coords:', { currentX, currentY });
    console.log('Selection style:', this.selectionStyle);
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.isSelectionActive) return;

    const containerRect = this.pdfContainer.nativeElement.getBoundingClientRect();
    const pdfViewer = document.querySelector('.pdfViewer');
    const pdfRect = pdfViewer ? pdfViewer.getBoundingClientRect() : containerRect;

    const offsetX = pdfRect.left - containerRect.left;
    const offsetY = pdfRect.top - containerRect.top;

    const endX = event.clientX - containerRect.left - offsetX;
    const endY = event.clientY - containerRect.top - offsetY;

    // Calculate the corner coordinates
    const x1 = Math.min(this.startX, endX);
    const y1 = Math.min(this.startY, endY);
    const x2 = Math.max(this.startX, endX);
    const y2 = Math.max(this.startY, endY);

    // Don't add if it's too small
    if (Math.abs(x2 - x1) < 10 || Math.abs(y2 - y1) < 10) {
      this.isSelectionActive = false;
      return;
    }

    // Choose a color for this selection
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
    setTimeout(() => {
      const element = document.getElementById(`selection-${this.coordsList[index].id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    //getCoordinates
    //convert cords value to point or remove point data type
    //get ID and metadata
    let pointsData: Point = {
      x:5,
      y:5
    }
    let coordinatesRequest: iCoordinatesReq = {
      topLeft:pointsData,
      topRight:pointsData,
      bottomLeft: pointsData,
      bottomRight: pointsData,
      metaData: "",
      docId: "docID"
    }
    this._fileEndpointsService.saveCoordinates(coordinatesRequest);
    console.log('Saving selections:', this.coordsList);
    alert(`Saved ${this.coordsList.length} selections for processing`);
  }

  editSelection(index: number): void {

  }
  pdfViewerElement: HTMLElement | null = null;
  scrollObserver: MutationObserver | null = null;
  findPdfViewerElement() {
    setTimeout(() => {
      this.pdfViewerElement = document.querySelector('.pdfViewer');
      if (this.pdfViewerElement) {
        console.log('Found PDF viewer element', this.pdfViewerElement);
        this.setupScrollObserver();
      } else {
        console.log('PDF viewer element not found, retrying...');
        this.findPdfViewerElement();
      }
    }, 1000);
  }
  setupScrollObserver() {
    if (!this.pdfViewerElement) return;

    const scrollContainer = this.pdfViewerElement.closest('.scrolledView') || this.pdfViewerElement.parentElement;

    if (!scrollContainer) return;

    console.log('Setting up scroll observer for', scrollContainer);

    // Use scroll event listener instead of MutationObserver for scrolling
    scrollContainer.addEventListener('scroll', () => {
      this.updateSelectionPositions();
    });

    // Also observe changes to the PDF viewer content itself
    this.scrollObserver = new MutationObserver(() => {
      this.updateSelectionPositions();
    });

    this.scrollObserver.observe(this.pdfViewerElement, {
      attributes: true,
      childList: true,
      subtree: true
    });
  }
  updateSelectionPositions() {
    if (!this.pdfViewerElement) return;

    // Get the current transform of the PDF content
    const pdfRect = this.pdfViewerElement.getBoundingClientRect();
    const containerRect = this.pdfContainer.nativeElement.getBoundingClientRect();

    // Calculate offset between container and PDF content
    const offsetX = pdfRect.left - containerRect.left;
    const offsetY = pdfRect.top - containerRect.top;

    // Update all selection positions
    this.coordsList.forEach(coords => {
      const element = document.getElementById(`selection-${coords.id}`);
      if (element) {
        // Apply the same transforms that the PDF content has to the selection
        element.style.left = `${coords.topLeft.x + offsetX}px`;
        element.style.top = `${coords.topLeft.y + offsetY}px`;
      }
    });
  }

  public _data: Array<object> = [
    {
      id: "yoh",
      created: "Today",
      fields: "23",
      processed: "1 document",
      accuracy: "68%",
      review: "N/A",
    }
  ];

  public _actions: Array<iTableLibActionsArgs> = [
    {
      title: 'Add New',
      event: async (args?: unknown) => {
        this._Router.navigate(["document-upload"])
      },
    },
  ];

  public _rowActions: Array<iTableLibActionsArgs> = [
    {
      title: 'Manage',
      event: async (id: string) => {
        this._Router.navigate(["snipping"])
      },
    },
  ];

}
