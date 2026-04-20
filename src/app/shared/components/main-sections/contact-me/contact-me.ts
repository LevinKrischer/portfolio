import { Component } from '@angular/core';
import { ContactForm } from '../../elements/contact-form/contact-form';
import { Footer } from '../../elements/footer/footer';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from '../../elements/button/button';

@Component({
  selector: 'app-contact-me',
  imports: [ContactForm, Footer, TranslateModule, Button],
  templateUrl: './contact-me.html',
  styleUrls: ['./contact-me.scss'],
})

export class ContactMe {}
