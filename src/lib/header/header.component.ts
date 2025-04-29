import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class AppHeaderComponent {
  constructor(
    private readonly _Router: Router
  ) { }
  public navigateHome = () => {
    this._Router.navigate(["/"])
  }
}