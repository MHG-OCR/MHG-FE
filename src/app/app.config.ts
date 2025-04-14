import {
  PreloadAllModules,
  PreloadingStrategy,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { routes } from './app.routes';
import { AuthInterceptor } from '../service/Auth/AuthSetHeaders';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from '../service/Http/HttpErrorInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: PreloadingStrategy, useClass: PreloadAllModules },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    provideAnimations(),
    provideRouter(routes, withComponentInputBinding()),
  ],
};