import { Component } from '@angular/core';
import { SocialLinks } from '../social-links/social-links';
import { MobileMenuService } from '../../../services/mobile-menue.service/mobile-menue.service';
@Component({
  selector: 'app-menue-mobile',
  imports: [SocialLinks],
  templateUrl: './menue-mobile.html',
  styleUrl: './menue-mobile.scss',
})
export class MenueMobile {

  constructor(private mobileMenu: MobileMenuService) { }

  get isOpen() {
    return this.mobileMenu.isOpen();
  }

  closeMenu() {
    this.mobileMenu.close();
  }
}
