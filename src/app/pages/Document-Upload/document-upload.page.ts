import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../../../components/file-upload/FileUploadComponent';
import { FileEndpoints } from '../../../service/Endpoints/FileEndpoints';
import { FileHelper } from '@helpers/FileHelper';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, FileUploadComponent],
  templateUrl: './document-upload.page.html',
  styleUrls: ['./document-upload.page.less'],
})
export class DocumentUploadComponent {
  constructor(
    private readonly _FileEndpoints: FileEndpoints
  ) { }
  async onSubmit(args: Array<File>) {
    const file = args[0]
    const fileBase64 = await FileHelper.toBase64(file)
    // todo 
    // this._FileEndpoints.uploadDocument()
  }
}