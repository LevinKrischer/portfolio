import { Component } from '@angular/core';
import { ContactForm } from "../../elements/contact-form/contact-form";
import { Footer } from "../../elements/footer/footer";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-me',
  imports: [ContactForm, Footer, TranslateModule],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.scss',
})
export class ContactMe {

}
