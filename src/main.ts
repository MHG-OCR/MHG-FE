import 'reflect-metadata';
import * as env from 'dotenv';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
env.config({
  path: './src/env/.env',
});
bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);