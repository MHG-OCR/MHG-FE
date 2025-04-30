import { LoadingService } from './../Loading/LoadingService';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iHttpRequest } from './iHttpService';
import { environment } from '@env/enviroment';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class HttpService {
  private DEFAULT_HEADERS = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private _HttpClient: HttpClient,
    private _LoadingService: LoadingService
  ) { }

  public request<ReturnType>(request: iHttpRequest): Observable<ReturnType> {
    this._LoadingService.show()
    const url = `${environment.backend_url}${request.path}`;
    return this._HttpClient.request<ReturnType>(
      request.type,
      url,
      {
        body: request.body,
        headers: this.DEFAULT_HEADERS,
      }
    );
  }
}