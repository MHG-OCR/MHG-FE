import { HttpService, IHttpService } from './../../../service/http.service';
import { Component, Inject, Input, OnInit, input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { IBaseForm, form_value_path } from '../iBaseForm';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../service/localStorage.service';
/**
 * @title Dialog with header, scrollable content and actions
 */
type iLoginModel = {
  name: string;
  password: string;
  selected : Date
};
@Component({
  selector: 'dialog-content-example',
  templateUrl: './calendar.main.form.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, FormsModule, CommonModule],
})
export class CalendarMainForm implements IBaseForm<iLoginModel> {
  formSubmitted: boolean = false;

  constructor(
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public formData: iLoginModel | null,
    public _httpService: HttpService,
    public _storageService: StorageService
  ) {
  }
  async ngOnInit(): Promise<void> {
    if(this.isThisDateCached()){
      this.formData = this.getThisDateCache();
    }
  }
  postFormData = async () => {
    console.log(this.formData)
    var request: IHttpService<iLoginModel> = {
      path: 'calendar',
      type: 'POST',
      body: this.formData!,
    };
    await this._httpService
      .request<boolean, iLoginModel>(request)
      .then((res) => {
        this._dialog.closeAll();
      })
      .catch((err) => {
        alert(err);
      });
      return;
  };
  submitForm = async (form: form_value_path<iLoginModel>) => {
    this.formData = {...this.formData, ...form.form.value};
    this.formSubmitted = true;
    this.cacheThisDate();
    await this.postFormData();
  };
  private cacheThisDate = () => {
    console.log(this.formData)
    this._storageService.setItem(this.formData!.selected.toString(),this.formData)
  }
  private isThisDateCached = () : boolean => {
    if (this._storageService.getItem(this.formData!.selected.toString()) == null)return false;
    return true;
  }
  private getThisDateCache<cacheValueType>(){
    return this._storageService.getItem(this.formData!.selected.toString()) as cacheValueType;
  }
}
