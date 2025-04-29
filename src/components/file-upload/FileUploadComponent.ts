import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-file-upload-component',
    templateUrl: './FileUploadComponent.html',
    styleUrls: ['./FileUploadComponent.less'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class FileUploadComponent {
    @Input() allowMultiple: boolean = false;
    @Input() acceptedFileTypes: string = '.pdf';
    @Input() maxFileSize: number = 10 * 1024 * 1024; // 10 MB by default
    @Output() filesUploaded = new EventEmitter<File[]>();
    selectedFiles: File[] = [];
    isDragging: boolean = false;
    isUploading: boolean = false;
    uploadProgress: number = 0;

    onFileSelected(event: any): void {
        const files: FileList = event.target.files;
        if (files.length) {
            if (this.allowMultiple) {
                this.selectedFiles = [...this.selectedFiles, ...Array.from(files)];
            } else {
                this.selectedFiles = [files[0]];
            }
        }
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = true;
    }

    onDragLeave(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;

        const files = event.dataTransfer?.files;
        if (files?.length) {
            if (this.allowMultiple) {
                this.selectedFiles = [...this.selectedFiles, ...Array.from(files)];
            } else {
                this.selectedFiles = [files[0]];
            }
        }
    }

    removeFile(index: number): void {
        this.selectedFiles = this.selectedFiles.filter((_, i) => i !== index);
    }

    clearFiles(): void {
        this.selectedFiles = [];
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    uploadFiles(): void {
        if (this.selectedFiles.length === 0) return;
        this.filesUploaded.emit(this.selectedFiles);
    }
}