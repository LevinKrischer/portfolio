import { Component, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { SocialLinks } from '../social-links/social-links';
import { MobileMenuService } from '../../../services/mobile-menue.service/mobile-menue.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menue-mobile',
  imports: [SocialLinks, TranslateModule, RouterLink],
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
    translate.addLangs(['en', 'de']);

    const savedLang = localStorage.getItem('userLanguage') || 'en';

    translate.setDefaultLang(savedLang);
    translate.use(savedLang);

    this.isGerman = savedLang === 'de';

    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });

    window.addEventListener('hashchange', this.onHashChange);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isOpen) return;

    const clickedElement = event.target as HTMLElement;

    if (clickedElement.closest('.mobileNavigation')) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(clickedElement);
    if (clickedInside) return;

    this.closeMenu();
  }

  private onHashChange = () => {
    if (this.isOpen) {
      this.closeMenu();
    }
  };

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    window.removeEventListener('hashchange', this.onHashChange);
  }

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
