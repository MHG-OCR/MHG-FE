import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "@env/environment";
import { OKTA_AUTH } from "@okta/okta-angular";
import { OktaAuth } from "@okta/okta-auth-js";
import { Observable } from "rxjs";

export const AuthInterceptorOkta: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const oktaAuth = inject(OKTA_AUTH) as OktaAuth;
  const allowedOrigins = environment.allowedOrigins;

  if (allowedOrigins.some((origin: string) => request.url.includes(origin))) {
    const authToken = oktaAuth.getAccessToken();
    if (authToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` }
      });
    }
  }

  return next(request);
};
