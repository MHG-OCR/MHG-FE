import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { LoadingService } from '../../service/Loading/LoadingService';

@Component({
  selector: 'loading-state-component',
  templateUrl: './loading.state.component.html',
  styleUrls: ['./loading.state.component.less'],
  standalone: true,
  imports: [NgIf, CommonModule]
})
export class LoadingStateComponent {
  constructor(private _LoadingSerivce: LoadingService) { }
  public isLoading$ = this._LoadingSerivce.isLoading$;
}