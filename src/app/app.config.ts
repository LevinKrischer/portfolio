import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { routes } from './app.routes';

export class MyTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  /**
   * Loads the translation file for the requested language.
   * @param lang Language code to activate.
   * @returns Computed method result.
   */
   getTranslation(lang: string): Observable<any> {
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}

/**
 * Creates the translation loader used in the app configuration.
 * @param http HttpClient instance used to load external resources.
 */
 export function httpLoaderFactory(http: HttpClient) {
  return new MyTranslateLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'disabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      fallbackLang: 'de',
    }),
  ],
};
