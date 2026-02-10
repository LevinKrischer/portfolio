import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss', '../button/button.scss'],
})
export class ContactForm {
  fb = inject(FormBuilder);
  translate = inject(TranslateService);

  showConsentError = false;

  // Default-Werte werden dynamisch aus i18n geladen
  defaultValues: Record<string, string> = {
    name: '',
    email: '',
    message: '',
  };

  // Fehlertexte → Translation Keys
  errorTexts: Record<string, string> = {
    name: 'CONTACT_FORM.ERROR_NAME',
    email: 'CONTACT_FORM.ERROR_EMAIL',
    message: 'CONTACT_FORM.ERROR_MESSAGE',
  };

  contactForm = this.fb.group({
    name: new FormControl('', []),
    email: new FormControl('', []),
    message: new FormControl('', []),
    consent: new FormControl(false, [Validators.requiredTrue]),
  });

  ngOnInit() {
    // Initiale Default-Werte laden und anwenden
    this.loadDefaultValues();
    this.applyDefaultValuesToForm();

    // Consent-Fehler zurücksetzen
    this.contactForm.get('consent')?.valueChanges.subscribe(() => {
      this.showConsentError = false;
    });

    // Live-Update bei Sprachwechsel
    this.translate.onLangChange.subscribe(() => {
      const previousDefaults = { ...this.defaultValues };
      this.loadDefaultValues();
      this.updateFieldsOnLanguageChange(previousDefaults);
    });
  }

  // Default-Werte aus Übersetzung laden
  loadDefaultValues() {
    this.defaultValues = {
      name: this.translate.instant('CONTACT_FORM.DEFAULT_NAME'),
      email: this.translate.instant('CONTACT_FORM.DEFAULT_EMAIL'),
      message: this.translate.instant('CONTACT_FORM.DEFAULT_MESSAGE'),
    };
  }

  // Formular initial mit Default-Werten konfigurieren
  applyDefaultValuesToForm() {
    this.contactForm.setControl(
      'name',
      new FormControl(this.defaultValues['name'], [
        Validators.required,
        Validators.minLength(3),
        this.isNotDefault(this.defaultValues['name']),
      ])
    );

    this.contactForm.setControl(
      'email',
      new FormControl(this.defaultValues['email'], [
        Validators.required,
        Validators.email,
        this.isNotDefault(this.defaultValues['email']),
      ])
    );

    this.contactForm.setControl(
      'message',
      new FormControl(this.defaultValues['message'], [
        Validators.required,
        Validators.minLength(3),
        this.isNotDefault(this.defaultValues['message']),
      ])
    );
  }

  // Default-Werte live aktualisieren, ohne Nutzereingaben zu überschreiben
  updateFieldsOnLanguageChange(previousDefaults: Record<string, string>) {
    ['name', 'email', 'message'].forEach(field => {
      const control = this.contactForm.get(field);
      if (!control) return;

      const currentValue = control.value;
      const oldDefault = previousDefaults[field];
      const newDefault = this.defaultValues[field];

      // Nur ersetzen, wenn der Nutzer noch nichts Eigenes eingegeben hat
      if (currentValue === '' || currentValue === oldDefault) {
        control.setValue(newDefault);
        control.markAsUntouched();
      }

      // Validatoren neu setzen (wegen neuer Default-Werte)
      control.setValidators([
        Validators.required,
        Validators.minLength(3),
        this.isNotDefault(newDefault),
      ]);

      control.updateValueAndValidity({ emitEvent: false });
    });
  }

  onDisabledSubmitAttempt() {
    const isDisabled = !this.contactForm.valid;

    if (isDisabled) {
      Object.values(this.contactForm.controls).forEach(control => {
        control.markAsTouched();
      });

      if (this.contactForm.get('consent')?.invalid) {
        this.showConsentError = true;
      }

      return;
    }
  }

  isNotDefault(defaultValue: string) {
    return (control: AbstractControl) => {
      if (control.value === defaultValue) {
        return { defaultValue: true };
      }
      return null;
    };
  }

  clearField(field: string) {
    const control = this.contactForm.get(field);
    if (!control) return;

    const current = control.value;

    if (current === this.defaultValues[field]) {
      control.setValue('');
      return;
    }

    if (control.touched && control.invalid) {
      control.setValue('');
      control.markAsUntouched();
    }
  }

  validateField(field: string) {
    const control = this.contactForm.get(field);
    if (!control) return;

    if (!control.value) {
      control.markAsTouched();
      control.setErrors({ required: true });
      return;
    }

    if (control.value === this.defaultValues[field]) {
      control.markAsTouched();
      control.setErrors({ defaultValue: true });
    }
  }

  getDisplayValue(field: string): string {
    const control = this.contactForm.get(field);
    if (!control) return '';

    if (control.touched && control.invalid) {
      return this.errorTexts[field]; // KEY → wird im Template übersetzt
    }

    return control.value ?? '';
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
    }
  }
}
