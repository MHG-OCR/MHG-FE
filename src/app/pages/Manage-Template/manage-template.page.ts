import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../../../components/file-upload/FileUploadComponent';
import { FileEndpoints } from '../../../service/Endpoints/FileEndpoints';
import { FileHelper } from '@helpers/FileHelper';
import { PDFSnippingComponent } from '@lib/pdf-snap/pdf.snap.component';
import { eOcrFlow } from '../../../service/Endpoints/Interfaces';
import { DocumentProcessedTableComponent } from '../../../components/document-processed-table/document-processed-table';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


interface NavState {
  id: number;
}

@Component({
  selector: 'manage-template-page',
  standalone: true,
  imports: [CommonModule, FileUploadComponent, PDFSnippingComponent, DocumentProcessedTableComponent],
  templateUrl: './manage-template.page.html',
  styleUrls: ['./manage-template.page.less'],
})
export class ManageTemplatePageComponent {
  private router = inject(Router);

  id: number | null = null;
  pdfBase64String: string | ArrayBuffer = '';
  
  constructor(
    private readonly _FileEndpoints: FileEndpoints
  ) {
    const navs = this.router.getCurrentNavigation()?.extras.state as NavState | undefined;;
    this.id = navs?.id ?? null;
  }
  
  async ngOnInit() {
    if (!this.id) {
      console.log('No file ID provided — skipping data load.');
      return;
    }
  
    const data = await this._FileEndpoints.getTemplateDocument({
      fileId: this.id
    });

    if (Array.isArray(data) && data.length > 0 && data[0].document_base64) {
      this.pdfBase64String = `data:application/pdf;base64,${data[0].document_base64}`;
    } else {
      return
    }
  }

  async onSubmit(args: Array<File>) {
    const file = args[0]
    const fileBase64 = await FileHelper.toBase64(file)
    var ocr_result = await this._FileEndpoints.uploadDocumentOcrFlow({
      filename: file.name,
      base64Data: fileBase64,
      size: file.size
    })
    console.log(ocr_result)
  }
}