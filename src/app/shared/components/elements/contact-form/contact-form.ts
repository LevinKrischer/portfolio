import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss', '../button/button.scss'],
})
export class ContactForm {
  fb = inject(FormBuilder);
  showConsentError = false;

  onDisabledSubmitAttempt() {
    const isDisabled = !this.contactForm.valid;

    // Nur reagieren, wenn der Button disabled ist
    if (isDisabled) {
      // Alle Felder als touched markieren
      Object.values(this.contactForm.controls).forEach(control => {
        control.markAsTouched();
      });

      // Checkbox-Fehler anzeigen
      const consent = this.contactForm.get('consent');
      if (consent?.invalid) {
        this.showConsentError = true;
      }

      return; // WICHTIG: Kein Submit hier
    }

    // Wenn der Button aktiv ist → NICHT submitten
    // Angular übernimmt das über (ngSubmit)
  }

  isNotDefault(defaultValue: string) {
    return (control: AbstractControl) => {
      if (control.value === defaultValue) {
        return { defaultValue: true };
      }
      return null;
    };
  }

  ngOnInit() {
    this.contactForm.get('consent')?.valueChanges.subscribe(() => {
      this.showConsentError = false;
    });
  }

  errorTexts: Record<string, string> = {
    name: 'Bitte gib deinen Namen ein',
    email: 'Bitte gib eine gültige E-Mail-Adresse ein',
    message: 'Bitte gib deine Nachricht ein',
  };

  defaultValues: Record<string, string> = {
    name: 'Dein Name hier',
    email: 'deineemail@mail.de',
    message: 'Hallo Levin, ich interessiere mich für...',
  };

  // Formular
  contactForm = this.fb.group({
    name: new FormControl(this.defaultValues['name'], [
      Validators.required,
      Validators.minLength(3),
      this.isNotDefault(this.defaultValues['name'])
    ]),
    email: new FormControl(this.defaultValues['email'], [
      Validators.required,
      Validators.email,
      this.isNotDefault(this.defaultValues['email'])
    ]),
    message: new FormControl(this.defaultValues['message'], [
      Validators.required,
      Validators.minLength(3),
      this.isNotDefault(this.defaultValues['message'])
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

    // Wenn leer → required Fehler
    if (!control.value) {
      control.markAsTouched();
      control.setErrors({ required: true });
      return;
    }

    // Wenn Defaultwert → Fehler
    if (control.value === this.defaultValues[field]) {
      control.markAsTouched();
      control.setErrors({ defaultValue: true });
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
