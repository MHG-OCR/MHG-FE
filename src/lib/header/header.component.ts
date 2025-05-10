import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, from } from 'rxjs';

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  standalone: true,
  imports: [CommonModule],
})
export class AppHeaderComponent {
  constructor(private readonly _Router: Router) {}
  public navigateHome = () => {
    this._Router.navigate(['/home']);
  };
  private oktaAuth = inject(OKTA_AUTH);

  private oktaAuthStateService = inject(OktaAuthStateService);
  public name$ = this.oktaAuthStateService.authState$.pipe(
    filter(
      (authState: AuthState) => !!authState && !!authState.isAuthenticated
    ),
    map((authState: AuthState) => authState.idToken?.claims.name ?? '')
  );

  logout() {
    from(this.oktaAuth.signOut());
    this.oktaAuth.clearStorage();
    this.oktaAuth.closeSession();
  }
}
