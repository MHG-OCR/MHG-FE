import { Injectable, inject } from "@angular/core";
import { OktaAuthStateService } from "@okta/okta-angular";
import { AuthState } from "@okta/okta-auth-js";
import { map, filter, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthServiceOkta {
  private oktaAuthStateService = inject(OktaAuthStateService);
  public isAuthenticated$: Observable<boolean> =
    this.oktaAuthStateService.authState$.pipe(
      filter((state: AuthState) => !!state),
      map((state: AuthState) => state.isAuthenticated ?? false)
    );
}
