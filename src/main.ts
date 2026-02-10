import { bootstrapApplication } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';

import { appConfig } from './app/app.config';
import { App } from './app/app';

import { provideHttpClient } from '@angular/common/http';

registerLocaleData(localeDe);
registerLocaleData(localeEn);

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),

    provideHttpClient(),

    {
      provide: LOCALE_ID,
      useFactory: () => {
        const saved = localStorage.getItem('userLanguage');
        if (saved === 'de') return 'de';
        return 'en';
      }
    }
  ]
})
  .catch(err => console.error(err));
