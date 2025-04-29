import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export default class iFormService {
  constructor(private _dialogServicex: MatDialog) {
  }
  protected pipe = (args: ComponentType<unknown>, data: unknown, afterClosedEffect: () => void) => {
    return this._dialogServicex!.open(args, {
      data: { ...{ data: data } },
      minWidth: '30vw',
      maxHeight: '95vh',
      enterAnimationDuration: 150,
      exitAnimationDuration: 100,
    }).afterClosed().subscribe(afterClosedEffect);
  };
}