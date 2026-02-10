import { Component } from '@angular/core';
import { SocialLinks } from '../social-links/social-links';
import { MobileMenuService } from '../../../services/mobile-menue.service/mobile-menue.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-menue-mobile',
  imports: [SocialLinks, TranslateModule],
  templateUrl: './menue-mobile.html',
  styleUrl: './menue-mobile.scss',
})
export class MenueMobile {
  isGerman: boolean = false;

  constructor(private mobileMenu: MobileMenuService, private translate: TranslateService) {
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

  get isOpen() {
    return this.mobileMenu.isOpen();
  }

  closeMenu() {
    this.mobileMenu.close();
  }
}
