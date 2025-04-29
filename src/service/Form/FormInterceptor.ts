import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import FormService from './FormService';
import { iAlertReponseArgs } from './iBaseForm';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class FormInterceptor implements HttpInterceptor {
    constructor(private readonly _formService: FormService, private readonly _Router: Router) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body && FormInterceptor.isAlertForm(event.body)) {
                        this._formService.openAlertForm((event.body.alertForm as unknown as iAlertReponseArgs).body)
                    }
                    if (event.body && FormInterceptor.isRedirectToForm(event.body)) {
                        this._Router.navigate([(event.body.redirectTo as iAlertReponseArgs).body])
                    }
                }
            })
        );
    }

    static isAlertForm = (args: any) => {
        return typeof args == 'object' && args.alertForm != null;
    }
    static isRedirectToForm = (args: any) => {
        return typeof args == 'object' && args.redirectTo != null;
    }
}