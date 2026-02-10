import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Footer } from '../../components/elements/footer/footer';
import { Navbar } from '../../components/elements/navbar/navbar';
import { MenueMobile } from '../../components/elements/menue-mobile/menue-mobile';

@Component({
  selector: 'app-privacy-policy',
  imports: [TranslateModule, Footer, Navbar, MenueMobile],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy {

}
