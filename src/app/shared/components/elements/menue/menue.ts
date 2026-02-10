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
    // Verfügbare Sprachen registrieren
    translate.addLangs(['en', 'de']);

    // Sprache aus localStorage laden oder EN als Default setzen
    const savedLang = localStorage.getItem('userLanguage') || 'en';

    // Default + aktive Sprache setzen
    translate.setDefaultLang(savedLang);
    translate.use(savedLang);

    // Toggle korrekt setzen
    this.isGerman = savedLang === 'de';
  }

  onToggleLanguage(event: Event) {
    const input = event.target as HTMLInputElement;
    this.isGerman = input.checked;

    const newLang = this.isGerman ? 'de' : 'en';

    // Sprache aktiv setzen
    this.translate.use(newLang);

    // Sprache dauerhaft speichern
    localStorage.setItem('userLanguage', newLang);
  }
}

