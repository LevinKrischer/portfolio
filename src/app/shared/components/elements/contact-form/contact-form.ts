import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../button/button';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss', '../button/button.scss'],
})

export class ContactForm {
  fb = inject(FormBuilder);

  contactForm = this.fb.group({
    name: new FormControl('Your name goes here', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('youremail@mail.de', [Validators.required, Validators.email]),
    message: new FormControl('Hello Levin, I am interested in...', [Validators.required, Validators.minLength(10)]),
    consent: new FormControl(false, [Validators.requiredTrue]),
  });

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
    }
  }
}
