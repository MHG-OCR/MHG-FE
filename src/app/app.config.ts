import {
  PreloadAllModules,
  PreloadingStrategy,
  provideRouter,
} from '@angular/router';
import { routes } from './app.routes';
import { AuthInterceptor } from '../service/Auth/AuthSetHeaders';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpBackend,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HttpErrorInterceptor } from '../service/Http/HttpErrorInterceptor';
import { FormInterceptor } from '../service/Form/FormInterceptor';
import { LoadingInterceptor } from '../service/Loading/LoadingInterceptor';
import { OktaAuthConfigService, OktaAuthModule } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { tap, take } from 'rxjs';
import { AuthInterceptorOkta } from '../service/Auth/auth-interceptor-okta';

function configInitializer(
  httpBackend: HttpBackend,
  configService: OktaAuthConfigService
): () => void {
  return () =>
    new HttpClient(httpBackend).get('assets/api/config.json').pipe(
      tap((authConfig: any) =>
        configService.setConfig({
          oktaAuth: new OktaAuth({
            ...authConfig,
            redirectUri: `${window.location.origin}/login/callback`,
            scopes: ['openid', 'offline_access', 'profile'],
          }),
        })
      ),
      take(1)
    );
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(OktaAuthModule),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: PreloadingStrategy, useClass: PreloadAllModules },
    provideHttpClient(withInterceptors([AuthInterceptorOkta])),
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    provideAnimations(),
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: FormInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: configInitializer,
      deps: [HttpBackend, OktaAuthConfigService],
      multi: true,
    },
  ],
};
