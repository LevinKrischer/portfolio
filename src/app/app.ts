import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');

  constructor(private translate: TranslateService) {
    // Fallback language
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    // Set initial language
    this.translate.use('de');
  }

  useLanguage(lang: string) {
    this.translate.use(lang);
  }
}
