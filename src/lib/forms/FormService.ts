import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import iFormService from './iFormService';

@Injectable({
  providedIn: 'root',
})
export default abstract class FormService extends iFormService {
  constructor(public _dialogService: MatDialog) {
    super(_dialogService);
  }
}
