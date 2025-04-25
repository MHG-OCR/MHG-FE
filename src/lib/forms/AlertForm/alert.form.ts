import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-alert-form',
  templateUrl: './alert.form.html',
  styleUrls: ['./alert.form.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogModule
  ],
})
export class AlertForm {
  constructor(
    @Inject(MAT_DIALOG_DATA) public _formData: { data?: string } = {}
  ) {
  }
}