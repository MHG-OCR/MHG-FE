import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from '@lib/header/header.component';
import { LoadingStateComponent } from '@lib/loading/loading.state.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  standalone: true,
  imports: [RouterOutlet, AppHeaderComponent, LoadingStateComponent],
})
export class AppComponent {
  public title = 'my-app';
}