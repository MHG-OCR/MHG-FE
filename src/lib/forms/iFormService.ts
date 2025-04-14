import { ComponentType } from '@angular/cdk/portal';
import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root',
})
export default class iFormService {
  constructor(public _dialogServicex: MatDialog) {
  }
  pipe = (args: ComponentType<unknown>, data: unknown) => {
    return this._dialogServicex!.open(args, {
      data: { value: { date: data } },
      minWidth: '85vw',
    }).afterClosed();
  };
}
