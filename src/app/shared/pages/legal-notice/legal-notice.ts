import { Component } from '@angular/core';
import { Navbar } from "../../components/elements/navbar/navbar";
import { Footer } from "../../components/elements/footer/footer";
import { MenueMobile } from "../../components/elements/menue-mobile/menue-mobile";

@Component({
  selector: 'app-legal-notice',
  imports: [Navbar, Footer, MenueMobile],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss',
})
export class LegalNotice {

}
