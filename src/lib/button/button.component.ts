// button.component.ts
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

export type IButtons =
  | 'Primary'
  | 'Secondary'
  | 'Tertiary'
  | 'White'
  | 'Outline';
  export type iButtonTypes =  | 'button'
| 'menu'
| 'reset'
| 'submit'
@Component({
  selector: 'app-button',
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
  standalone: true,
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  @Input({ required: true }) Text?: string;
  @Input({ required: true }) Type!: IButtons;
  @Input({ required: false }) Class?: string;
  @Input({ required: true }) ButtonType?: iButtonTypes;

  ngOnInit(): void {}
}
