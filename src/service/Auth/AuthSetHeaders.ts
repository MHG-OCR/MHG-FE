import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly _authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        userId: this._authService.GetCredentials()?.userId ?? `null`,
        userRole: this._authService.GetCredentials()?.userRole ?? `null`,
        userToken: this._authService.GetCredentials()?.userToken ?? `null`,
        'Content-Type': 'application/json',
      },
    });
    return next.handle(req);
  }
}