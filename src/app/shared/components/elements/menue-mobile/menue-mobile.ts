import { Component, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { SocialLinks } from '../social-links/social-links';
import { MobileMenuService } from '../../../services/mobile-menue.service/mobile-menue.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menue-mobile',
  imports: [SocialLinks, TranslateModule],
  templateUrl: './menue-mobile.html',
  styleUrl: './menue-mobile.scss',
})
export class MenueMobile implements OnDestroy {
  isGerman: boolean = false;
  private routerSub?: Subscription;

  constructor(
    private mobileMenu: MobileMenuService,
    private translate: TranslateService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    // Verfügbare Sprachen registrieren
    translate.addLangs(['en', 'de']);

    // Sprache aus localStorage laden oder EN als Default setzen
    const savedLang = localStorage.getItem('userLanguage') || 'en';

    translate.setDefaultLang(savedLang);
    translate.use(savedLang);

    this.isGerman = savedLang === 'de';

    // Route-Wechsel: Menü schließen
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });

    // Hash-Wechsel (#aboutMe etc.)
    window.addEventListener('hashchange', this.onHashChange);
  }

  // ⭐ Outside-Click: Menü schließen, außer der Menü-Button wurde geklickt
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isOpen) return;

    const clickedElement = event.target as HTMLElement;

    // Wenn der Menü-Button geklickt wurde → NICHT schließen
    if (clickedElement.closest('.mobileNavigation')) {
      return;
    }

    // Wenn innerhalb der Komponente geklickt wurde → NICHT schließen
    const clickedInside = this.elementRef.nativeElement.contains(clickedElement);
    if (clickedInside) return;

    // Alles andere → Menü schließen
    this.closeMenu();
  }

  // Hashchange-Handler
  private onHashChange = () => {
    if (this.isOpen) {
      this.closeMenu();
    }
  };

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    window.removeEventListener('hashchange', this.onHashChange);
  }

  // ⭐ Wiederhergestellt: Menü öffnen/schließen
  toggleMobileMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.mobileMenu.open();
    }
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
