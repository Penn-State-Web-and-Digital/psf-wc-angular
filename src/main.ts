import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import '@psu-flex/core-ui-federated-wc';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
