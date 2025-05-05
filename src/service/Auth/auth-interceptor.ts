import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { OKTA_AUTH } from "@okta/okta-angular";

export const AuthInterceptorOktaXXX: HttpInterceptorFn = (
  req,
  next,
  oktaAuth = inject(OKTA_AUTH)
) => {
  let request = req;
  const accessToken = oktaAuth.getAccessToken();

  request = req.clone({
    setHeaders: { Authorization: `Bearer ${accessToken}` }
  });

  return next(request);
};