import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
  standalone: true,
  imports: [RouterOutlet],
})
export class HomePageComponent {
}