import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy
} from "@angular/core";
import { Router } from "@angular/router";
import { OKTA_AUTH } from "@okta/okta-angular";
import { map, from, Subscription } from "rxjs";

@Component({
  selector: "app-landing-view",
  templateUrl: "./landing-view.component.html",
  imports: [CommonModule],
  styleUrls: ["./landing-view.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingViewComponent implements OnDestroy {
  private router = inject(Router);
  private oktaAuth = inject(OKTA_AUTH);
  private subscription: Subscription = new Subscription();

  public signIn(): void {
    const authSub = from(this.oktaAuth.signInWithRedirect())
      .pipe(map(() => this.router.navigate(["/chat"])))
      .subscribe({
        error: (err) => console.error("Sign-in error", err)
      });
    this.subscription.add(authSub);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe;
  }
}
