import { Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

type iBaseFormAbstract = Partial<OnInit & OnDestroy>;

export default abstract class iBaseForm implements iBaseFormAbstract {
  @Inject(MAT_DIALOG_DATA) private data: unknown;
  @Inject(MatDialog) private form: MatDialog;
  abstract  _dialog: MatDialog;
  abstract formData: unknown;
  constructor(public dialog: MatDialog) {
    this.form = dialog;
  }
  formSubmitted: boolean = false;
  abstract submitForm: (form: any) => void;
  abstract ngOnInit: () => void;
}
export interface IBaseForm<T> {
  formData: T | null;
  formSubmitted: boolean | null;
  ngOnInit: () => void;
  submitForm: (form: form_value_path<T>) => void;
}

export interface form_value_path<form_data> {
  form: {
    value: form_data;
  };
}
