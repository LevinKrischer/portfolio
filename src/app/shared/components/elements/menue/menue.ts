import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menue',
  imports: [TranslateModule],
  templateUrl: './menue.html',
  styleUrl: './menue.scss',
})
export class Menue {
  isGerman: boolean = false;

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    this.isGerman = this.translate.currentLang === 'de';
  }

  onToggleLanguage(event: Event) {
    const input = event.target as HTMLInputElement;
    this.isGerman = input.checked;

    const newLang = this.isGerman ? 'de' : 'en';
    this.translate.use(newLang);

    localStorage.setItem('userLanguage', newLang);
  }
}
