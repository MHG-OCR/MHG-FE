import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SlideComponent } from '../../../input/slide/slide.component';
import { HappyComponent } from '../../../input/happy/happy.component';
import { IonContent, IonHeader, IonItem } from '@ionic/angular/standalone';
import { ButtonComponent } from '../../../button/button.component';
import CalendarTaskService from '../../../../service/CalendarTaskForm/calendarTask.service';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { StorageService } from '../../../../service/Helpers/localStorage.service';

@Component({
  selector: 'dialog-content-example',
  templateUrl: './calendar.task.form.html',
  styleUrls: ['./calendar.task.form.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    CommonModule,
    SlideComponent,
    ReactiveFormsModule,
    HappyComponent,
    IonContent,
    IonHeader,
    ButtonComponent,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    IonItem,
  ],
})
export class CalendarTaskForm {
  public form: FormGroup;

  constructor(
    public _calendarTaskService: CalendarTaskService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public _formData: { date?: Date } = {}
  ) {
    this.form = this._formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  async ngOnInit(): Promise<void> {
    // @ts-ignore
    this._formData = this._formData.value;
  }
  submitForm = async () => {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    await this._calendarTaskService
      .postNewTask({
        title: this.form.value.title,
        date: this._formData.date!,
      })
      .then((res) => {
        StorageService.setItem("CalendarNewTask", res);
        document.getElementById('closetaskform')?.click();
      });
  };
  getColorBorder = () => {
    return `border: 2px solid ${this.form.valid ? 'green' : 'black'};`;
  };
  getColorText = () => {
    return `color: ${this.form.valid ? 'green' : 'black'};`;
  };
}
export interface iNewTask {
  title: string;
  date: Date;
}