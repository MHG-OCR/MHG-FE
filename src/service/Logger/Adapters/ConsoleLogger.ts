import { Injectable } from "@angular/core";
import iLoggerAdapter from "../iLoggerAdapter";

@Injectable({
  providedIn: 'root',
})
// Still need to implement TODO
export default class ConsoleLoggerAdapter implements iLoggerAdapter {
  log = (message: string | object | any[]) => {
    console.log({
      message: message,
      timestamp: new Date().toISOString(),
    });
  };
  warn = (message: object | string | Array<any>) => {
    console.warn({
      message: message,
      timestamp: new Date().toISOString(),
    });
  };
}