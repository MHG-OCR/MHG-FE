import { Injectable } from '@angular/core';
import { EnvConfig } from '@env/EnvConfig';
import { HttpClient } from '@angular/common/http';
import { iHttpRequest } from './iHttpService';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
  };
  constructor(private _httpClient: HttpClient) { }

  public request<ReturnType>(request: iHttpRequest): Promise<ReturnType> {
    // TODO refactor , remove promise wrapper
    return new Promise((res, rej) => {
      const url = `${EnvConfig.getAppConfig().backend_url
        }${request.path}`;
      var httpOptions = {
        headers: this.DEFAULT_HEADERS,
      };
      return this._httpClient
        .request<ReturnType>(request.type, url, {
          body: request.body,
          ...httpOptions,
        })
        .subscribe({
          next: (value: unknown) => {
            res(value as ReturnType);
          },
          error(err: any) {
            rej(err.message);
          },
        });
    });
  }
}