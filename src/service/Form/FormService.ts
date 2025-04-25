import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import iFormService from './iFormService';
import { AlertForm } from '@lib/forms/AlertForm/alert.form';

@Injectable({
  providedIn: 'root',
})
export default abstract class FormService extends iFormService {
  constructor(private _dialogService: MatDialog) {
    super(_dialogService);
  }
  public defaultRefreshAfterFormClose = () => { window.location.reload(); }

  public openAlertForm = (
    args: string,
    after: () => void = this.defaultRefreshAfterFormClose
  ) => this.pipe(AlertForm, args, after);
}