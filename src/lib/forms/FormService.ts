import { AppComponent } from './../../app/app.component';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarTaskForm } from './CalendarForms/calendarTask/calendar.task.form';
import iFormService from './iFormService';
import { CalendarMainForm } from './CalendarForms/calendar/calendar.main.form';
@Injectable({
  providedIn: 'root',
})
export default abstract class FormService extends iFormService {
  constructor(public _dialogService: MatDialog) {
    super(_dialogService);
  }
  public openCalendarTaskForm = (
    data?: Date | undefined,
    after: Function = () => {}
  ) => this.pipe(CalendarTaskForm, data);
}
