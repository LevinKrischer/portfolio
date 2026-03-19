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
    private elementRef: ElementRef,
  ) {
    this.initializeLanguage();
    this.subscribeToRouterEvents();
    this.registerHashChangeHandler();
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

  /** Handles hash change events to close the menu if it's open. */
  private onHashChange = () => {
    if (this.isOpen) {
      this.closeMenu();
    }
  };

  /**
   * Initializes language settings based on persisted user preference.
   */
  private initializeLanguage() {
    const savedLang = localStorage.getItem('userLanguage') || 'en';
    this.translate.addLangs(['en', 'de']);
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);
    this.isGerman = savedLang === 'de';
  }

  /**
   * Subscribes to router events and closes the menu on navigation.
   */
  private subscribeToRouterEvents() {
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });
  }

  /**
   * Registers a listener for hash navigation changes.
   */
   private registerHashChangeHandler() {
    window.addEventListener('hashchange', this.onHashChange);
  }

  /**
   * Cleans up subscriptions and event listeners.
   */
   ngOnDestroy() {
    this.routerSub?.unsubscribe();
    window.removeEventListener('hashchange', this.onHashChange);
  }

  /**
   * Toggles the mobile menu visibility.
   */
   toggleMobileMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.mobileMenu.open();
    }
  }

  /**
   * Switches the active language and stores the selection locally.
   * @param event Triggered browser or UI event instance.
   */
   onToggleLanguage(event: Event) {
    const input = event.target as HTMLInputElement;
    this.isGerman = input.checked;
    const newLang = this.isGerman ? 'de' : 'en';
    this.translate.use(newLang);
    localStorage.setItem('userLanguage', newLang);
  }

  /**
   * Returns whether the mobile menu is currently open.
   * @returns Computed method result.
   */
   get isOpen() {
    return this.mobileMenu.isOpen();
  }

  /**
   * Closes the mobile menu.
   */
   closeMenu() {
    this.mobileMenu.close();
  }
}
