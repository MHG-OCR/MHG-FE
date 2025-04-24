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

  constructor(private httpClient: HttpClient) { }

  public request<ReturnType>(request: iHttpRequest): Observable<ReturnType> {
    const url = `${environment.backend_url}${request.path}`;
    return this.httpClient.request<ReturnType>(
      request.type,
      url,
      {
        body: request.body,
        headers: this.DEFAULT_HEADERS,
      }
    );
  }
}