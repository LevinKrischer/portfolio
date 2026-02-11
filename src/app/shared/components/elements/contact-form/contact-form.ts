import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss', '../button/button.scss'],
})
export class ContactForm {

  // HttpClient korrekt injizieren
  constructor(private http: HttpClient) { }

  fb = inject(FormBuilder);
  translate = inject(TranslateService);

  showConsentError = false;

  defaultValues: Record<string, string> = {
    name: '',
    email: '',
    message: '',
  };

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
    this.loadDefaultValues();
    this.applyDefaultValuesToForm();

    this.contactForm.get('consent')?.valueChanges.subscribe(() => {
      this.showConsentError = false;
    });

    this.translate.onLangChange.subscribe(() => {
      const previousDefaults = { ...this.defaultValues };
      this.loadDefaultValues();
      this.updateFieldsOnLanguageChange(previousDefaults);
    });
  }

  loadDefaultValues() {
    this.defaultValues = {
      name: this.translate.instant('CONTACT_FORM.DEFAULT_NAME'),
      email: this.translate.instant('CONTACT_FORM.DEFAULT_EMAIL'),
      message: this.translate.instant('CONTACT_FORM.DEFAULT_MESSAGE'),
    };
  }

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

  updateFieldsOnLanguageChange(previousDefaults: Record<string, string>) {
    ['name', 'email', 'message'].forEach(field => {
      const control = this.contactForm.get(field);
      if (!control) return;

      const currentValue = control.value;
      const oldDefault = previousDefaults[field];
      const newDefault = this.defaultValues[field];

      if (currentValue === '' || currentValue === oldDefault) {
        control.setValue(newDefault);
        control.markAsUntouched();
      }

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
      return this.errorTexts[field];
    }

    return control.value ?? '';
  }

  onSubmit() {
    if (this.contactForm.invalid) return;

    const formData = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message
    };

    this.http.post(
      'send_mail.php',
      formData,
      { responseType: 'json' }
    )
      .subscribe({
        next: (response: any) => {
          console.log("Mail gesendet:", response);
        },
        error: (error: any) => {
          console.error("Fehler beim Senden:", error);
        }
      });
  }
}
