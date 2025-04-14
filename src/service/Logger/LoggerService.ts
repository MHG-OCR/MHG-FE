import { Injectable } from '@angular/core';
import iLoggerAdapter, { eLoggerAdapters } from './iLoggerAdapter';
import { container } from 'tsyringe';
import ConsoleLoggerAdapter from './Adapters/ConsoleLogger';

@Injectable({
  providedIn: 'root',
})
export default class LoggerService {
  private _adapter?: iLoggerAdapter;
  private _logService: string = '';
  private _isInitialized: boolean = false;
  constructor() {
    // for default configuration.
    // TODO log to db. so i can see whats going on on the user side
    this._runWith(eLoggerAdapters.ConsoleLogger);
  }
  private shouldResolve = (method: () => void | unknown) => {
    if (!this._isInitialized) return;
    method();
  };
  public _runWith = (logUsing: eLoggerAdapters) => {
    switch (logUsing) {
      default:
        this._adapter = container.resolve(ConsoleLoggerAdapter);
        break;
    }
    this._isInitialized = true;
  };
  public warn = (message: object | string | Array<any>) => {
    this.shouldResolve(() => {
      this._adapter?.warn(message);
    });
  };
  public danger = (message: object | string | Array<any>, stack?: string) => {
    this.shouldResolve(() => {
      this._adapter?.warn(message);
    });
  };
  public log = (message: object | string | Array<any>) => {
    this.shouldResolve(() => {
      this._adapter?.log(message);
    });
  };
}