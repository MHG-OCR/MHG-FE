import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './LoadingService';

@Injectable({
    providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private readonly _loadingService: LoadingService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loadingService.show();
        return next.handle(req).pipe(
            finalize(() => {
                this._loadingService.hide();
            })
        );
    }
}