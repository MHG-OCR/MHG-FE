import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import LoggerService from '../Logger/LoggerService';
import { AuthService } from './../Auth/AuthService';
import { finalize, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  private _router: Router;
  constructor(
    private _loggerService: LoggerService,
    private _authService: AuthService
  ) {
    this._router = new Router();
  }
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 500: {
            this._loggerService.log({
              severity: 'error',
              summary: '',
              detail: 'Cannot connect to server',
            });
            break;
          }
          case 400: {
            this._loggerService.log({
              severity: 'error',
              detail: err.error.description,
            });
            break;
          }
          case 401: {
            this._loggerService.log({
              severity: 'warning',
              summary: '',
              detail: err.error.description,
            });
            this._authService.clearCredentials();
            this._router.navigate(['signin']);
            break;
          }
          case 404: {
            this._loggerService.log({
              severity: 'warning',
              summary: 'Error ',
              detail: 'Not Found',
            });
            break;
          }
          default: {
            this._loggerService.log({
              severity: 'error',
              summary: 'Error ',
              detail: err.message,
            });
          }
        }
        return throwError(err);
      }),
      finalize(() => {})
    );
  }
}