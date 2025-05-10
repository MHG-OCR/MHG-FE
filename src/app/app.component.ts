import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from '@lib/header/header.component';
import { LoadingStateComponent } from '@lib/loading/loading.state.component';
import { OktaAuthStateService } from '@okta/okta-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  standalone: true,
  imports: [RouterOutlet, AppHeaderComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public title = 'my-app';
  private authStateService = inject(OktaAuthStateService);
  private router = inject(Router);
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.authStateService.authState$.subscribe(
      (authState) => {
        if (authState.isAuthenticated && authState.idToken) {
          this.router.navigate(['/home']);
        }
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
