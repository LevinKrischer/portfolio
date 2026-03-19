import { Injectable, signal } from '@angular/core';
@Injectable({ providedIn: 'root' })

export class MobileMenuService {
  isOpen = signal(false);

  /**
   * Toggles the mobile menu state.
   */
   toggle() {
    this.isOpen.update((v) => !v);
  }

  /**
   * Opens the mobile menu state.
   */
   open() {
    this.isOpen.set(true);
  }

  /**
   * Closes the mobile menu state.
   */
   close() {
    this.isOpen.set(false);
  }
}
