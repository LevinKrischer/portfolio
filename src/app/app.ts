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
    const savedLang = localStorage.getItem('userLanguage') || 'en';

    translate.setDefaultLang(savedLang);
    translate.use(savedLang);
  }

  ngOnInit() {
    // NICHTS MEHR HIER SETZEN!
    // Alles passiert bereits im Constructor.
  }

  useLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('userLanguage', lang);
  }
}

