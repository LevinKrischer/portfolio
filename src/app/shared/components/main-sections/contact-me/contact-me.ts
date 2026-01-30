import { Component } from '@angular/core';
import { ContactForm } from "../../elements/contact-form/contact-form";
import { Footer } from "../../elements/footer/footer";

@Component({
  selector: 'app-contact-me',
  imports: [ContactForm, Footer],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.scss',
})
export class ContactMe {

}
