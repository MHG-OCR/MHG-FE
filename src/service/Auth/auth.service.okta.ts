import { Injectable, inject } from "@angular/core";
import { OktaAuthStateService } from "@okta/okta-angular";
import OktaAuth, { AuthState } from "@okta/okta-auth-js";
import { map, filter, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthServiceOkta {
  private oktaAuthStateService = inject(OktaAuthStateService);
  private oktaAuth = inject(OktaAuth);
  public isAuthenticated$: Observable<boolean> =
    this.oktaAuthStateService.authState$.pipe(
      filter((state: AuthState) => !!state),
      map((state: AuthState) => state.isAuthenticated ?? false)
    );

    public async getAccessToken(): Promise<string | undefined> {
      const accessToken = await this.oktaAuth.getAccessToken();
      return accessToken ?? undefined;
    }
}
