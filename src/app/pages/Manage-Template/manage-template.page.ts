import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../../../components/file-upload/FileUploadComponent';
import { FileEndpoints } from '../../../service/Endpoints/FileEndpoints';
import { FileHelper } from '@helpers/FileHelper';
import { PDFSnippingComponent } from '@lib/pdf-snap/pdf.snap.component';
import { eOcrFlow } from '../../../service/Endpoints/Interfaces';
import { DocumentProcessedTableComponent } from '../../../components/document-processed-table/document-processed-table';

@Component({
  selector: 'manage-template-page',
  standalone: true,
  imports: [CommonModule, FileUploadComponent, PDFSnippingComponent, DocumentProcessedTableComponent],
  templateUrl: './manage-template.page.html',
  styleUrls: ['./manage-template.page.less'],
})
export class ManageTemplatePageComponent {
  constructor(
    private readonly _FileEndpoints: FileEndpoints
  ) { }
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