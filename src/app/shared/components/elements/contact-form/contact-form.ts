import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss', '../button/button.scss'],
})
export class ContactForm {
  fb = inject(FormBuilder);

  // Fehlertexte pro Feld
  errorTexts: Record<string, string> = {
    name: 'Please enter your name',
    email: 'Please enter a valid email address',
    message: 'Please enter your message',
  };

  // Defaultwerte pro Feld
  defaultValues: Record<string, string> = {
    name: 'Your name goes here',
    email: 'youremail@mail.de',
    message: 'Hello Levin, I am interested in...',
  };

  // Formular
  contactForm = this.fb.group({
    name: new FormControl(this.defaultValues['name'], [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl(this.defaultValues['email'], [
      Validators.required,
      Validators.email,
    ]),
    message: new FormControl(this.defaultValues['message'], [
      Validators.required,
      Validators.minLength(3),
    ]),
    consent: new FormControl(false, [Validators.requiredTrue]),
  });

  // Feld leeren beim Fokus
  clearField(field: string) {
    const control = this.contactForm.get(field);
    if (!control) return;

    const current = control.value;

    // Wenn Defaultwert drinsteht → leeren
    if (current === this.defaultValues[field]) {
      control.setValue('');
      return;
    }

    // Wenn gerade ein Fehler angezeigt wird → leeren
    if (control.touched && control.invalid) {
      control.setValue('');
      control.markAsUntouched(); // verhindert sofortiges Wiederanzeigen des Fehlers
    }
  }



  // Validierung beim Verlassen
  validateField(field: string) {
    const control = this.contactForm.get(field);
    if (!control) return;

    if (!control.value) {
      control.markAsTouched();
      control.setErrors({ required: true });
    }
  }

  // Wert oder Fehlertext anzeigen
  getDisplayValue(field: string): string {
    const control = this.contactForm.get(field);
    if (!control) return '';

    if (control.touched && control.invalid) {
      return this.errorTexts[field];
    }

    return control.value ?? '';
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
    }
  }
}
