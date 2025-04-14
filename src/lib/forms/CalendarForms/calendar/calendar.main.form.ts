import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SlideComponent } from '../../../input/slide/slide.component';
import { HappyComponent } from '../../../input/happy/happy.component';
import { IonContent, IonHeader, IonIcon } from '@ionic/angular/standalone';
import { ButtonComponent } from '../../../button/button.component';
import CalendarTaskService from '../../../../service/CalendarTaskForm/calendarTask.service';
import CalendarMainFormService from '../../../../service/CalendarMainForm/calendarMainForm.service';
import { iCalendarModal, iCalendarTasks } from '../../../../service/CalendarMainForm/iCalendarMainForm.service';
import FormService from '../../FormService';
import { StorageService } from '../../../../service/Helpers/localStorage.service';
import { iNewTask } from '../calendarTask/calendar.task.form';

@Component({
  selector: 'dialog-content-example',
  templateUrl: './calendar.main.form.html',
  styleUrls: ['./calendar.main.form.scss'],
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
    IonIcon,
  ],
})
export class CalendarMainForm {
  public _showDeleteButtonOnTasks: boolean = false
  constructor(
    public _calendarTaskService: CalendarTaskService,
    public _calendarMainFormService: CalendarMainFormService,
    public _formService: FormService,
    @Inject(MAT_DIALOG_DATA) public formData: iCalendarModal | null, 
  ) {}
  async ngOnInit(): Promise<void> {
    this._calendarMainFormService.formData = this.formData;
    if (this._calendarMainFormService.isThisDateCached()) {
      this._calendarMainFormService.formData =
        this._calendarMainFormService.getThisDateCache();
      return;
    }
    await this._calendarMainFormService.submitForm(
      {
        form: { value: { tasks: [], date: this.formData?.date! } },
      },
      true
    );
    if (this.formData) this._calendarMainFormService.cacheThisDate();
    return;
  }

  openAddTaskForm = () => {
    this._formService.openCalendarTaskForm(this.formData?.date!).subscribe({
      next: async () => {
        var result = StorageService.getItem(
          'CalendarNewTask'
        ) as iNewTask | null;
        if (result != null) {
          this._calendarMainFormService.formData?.tasks?.push({
            title: result.title,
            result: 0,
          });
        }
        StorageService.removeItem('CalendarNewTask')
      },
    });
  };
  getCalendarFormDatePretty = () => {
    var date = new Date(
      this._calendarMainFormService.formData?.date as unknown as string
    );
    date.setDate(date.getDate() + 1);
    return date
      .toUTCString()
      .split(' ')
      .filter((_, i) => i < 4 && true)
      .join(' ');
  };
  enableDeleteTaskFlow = () => {
    this._showDeleteButtonOnTasks = true;
  }
  removeTaskById = async (args : iCalendarTasks) => {
    // @ts-ignore
    this._calendarMainFormService.formData!.tasks = this._calendarMainFormService.formData?.tasks.filter(item => item != args);
    this._showDeleteButtonOnTasks = false;
    await this._calendarMainFormService.postFormData();
    return;
  }
}