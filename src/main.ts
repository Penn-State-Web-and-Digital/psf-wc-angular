import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {
  defineAllPsuElements,
  enablePsuChromeDebug,
} from '@psu-flex/core-ui-federated-wc';

enablePsuChromeDebug(true);
defineAllPsuElements();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
