import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './AuthService';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly _authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const oktaAuth = inject(OKTA_AUTH) as OktaAuth;
    var res = oktaAuth.getAccessToken()
    // var res = this._authService.testGetTokenFromQueryP()
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${res}`,
        'Content-Type': 'application/json',
      },
    });
    return next.handle(req);
  }
}