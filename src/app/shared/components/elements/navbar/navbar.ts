import { Component } from '@angular/core';
import { Menue } from '../menue/menue';
import { MobileMenuService } from '../../../services/mobile-menue.service/mobile-menue.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [Menue, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  constructor(private mobileMenu: MobileMenuService) { }

  toggleMobileMenu() {
    this.mobileMenu.toggle();
  }
}
