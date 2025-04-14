import iLoggerAdapter from "../iLoggerAdapter";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
// Still need to implement TODO
export default class SqlLoggerAdapter implements iLoggerAdapter {
  log = (message: string | object | any[]) => {
    this.warn(message)
  };
  warn = (message: object | string | Array<any>) => {
    console.log("SQL IMPLEMENTATION TODO");
  };
}