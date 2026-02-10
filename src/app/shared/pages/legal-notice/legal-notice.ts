import { Component } from '@angular/core';
import { Navbar } from "../../components/elements/navbar/navbar";
import { Footer } from "../../components/elements/footer/footer";
import { MenueMobile } from "../../components/elements/menue-mobile/menue-mobile";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-legal-notice',
  imports: [Navbar, Footer, MenueMobile, TranslateModule],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss',
})
export class LegalNotice {

}
