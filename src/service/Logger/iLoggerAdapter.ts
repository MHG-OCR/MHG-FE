import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root',
})
export default abstract class iLoggerAdapter {
  abstract warn: (
    message: object | string | Array<any>
  ) => void | unknown;
  abstract log: (message: object | string | Array<any>) => void;
}

export enum eLoggerAdapters {
  ConsoleLogger = "ConsoleLogger",
}