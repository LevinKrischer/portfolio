import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

export function emailWithDefaultValidator(defaultValue: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim() ?? '';
    if (!value) return { required: true };
    if (value === defaultValue) return { defaultValue: true };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return { email: true };
    return null;
  };
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, RouterModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss', '../button/button.scss'],
})
export class ContactForm {

  constructor(private http: HttpClient) { }

  fb = inject(FormBuilder);
  translate = inject(TranslateService);

  showConsentError = false;

  loading = false;
  success = false;
  error = false;

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
    this.contactForm.get('consent')?.valueChanges.subscribe(() => this.showConsentError = false);
    this.translate.onLangChange.subscribe(() => {
      const prev = { ...this.defaultValues };
      this.loadDefaultValues();
      this.updateFieldsOnLanguageChange(prev);
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
    this.contactForm.setControl('name', new FormControl(this.defaultValues['name'], [
      Validators.required,
      Validators.minLength(1),
      this.isNotDefault(this.defaultValues['name']),
    ]));
    this.contactForm.setControl('email', new FormControl(this.defaultValues['email'], [
      emailWithDefaultValidator(this.defaultValues['email'])
    ]));
    this.contactForm.setControl('message', new FormControl(this.defaultValues['message'], [
      Validators.required,
      Validators.minLength(1),
      this.isNotDefault(this.defaultValues['message']),
    ]));
  }

  updateFieldsOnLanguageChange(prev: Record<string, string>) {
    ['name', 'email', 'message'].forEach(field => {
      const control = this.contactForm.get(field);
      if (!control) return;
      const oldDefault = prev[field];
      const newDefault = this.defaultValues[field];
      if (control.value === '' || control.value === oldDefault) {
        control.setValue(newDefault);
        control.markAsUntouched();
      }
      if (field === 'email') {
        control.setValidators([emailWithDefaultValidator(newDefault)]);
      } else {
        control.setValidators([
          Validators.required,
          Validators.minLength(1),
          this.isNotDefault(newDefault),
        ]);
      }
      control.updateValueAndValidity({ emitEvent: false });
    });
  }

  isNotDefault(defaultValue: string) {
    return (control: AbstractControl) =>
      control.value === defaultValue ? { defaultValue: true } : null;
  }

  isInvalid(field: string): boolean {
    const c = this.contactForm.get(field);
    return !!(c && c.touched && c.invalid);
  }

  showDefaultError(field: string): boolean {
    const c = this.contactForm.get(field);
    return !!(c && c.touched && c.invalid && c.value === this.defaultValues[field]);
  }

  clearError(field: string) {
    const control = this.contactForm.get(field);
    if (!control) return;
    const defaultValue = this.defaultValues[field];
    if (control.value === defaultValue) control.setValue('');
    control.markAsUntouched();
  }

  validateField(field: string) {
    const control = this.contactForm.get(field);
    if (!control) return;
    const defaultValue = this.defaultValues[field];
    if (!control.value || control.value.trim() === '') control.setValue(defaultValue);
    control.markAsTouched();
    control.updateValueAndValidity();
  }

  onDisabledSubmitAttempt() {
    if (!this.contactForm.valid) {
      Object.values(this.contactForm.controls).forEach(c => c.markAsTouched());
      if (this.contactForm.get('consent')?.invalid) this.showConsentError = true;
    }
  }

  onSubmit() {
    if (this.contactForm.invalid) return;

    this.loading = true;
    this.success = false;
    this.error = false;

    const formData = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message
    };

    this.http.post('send_mail.php', formData, { responseType: 'json' })
      .subscribe({
        next: () => {
          this.loading = false;
          this.success = true;

          this.contactForm.reset();
          this.contactForm.get('consent')?.setValue(false);

          setTimeout(() => {
            this.success = false;
          }, 2000);
        },
        error: () => {
          this.loading = false;
          this.error = true;

          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      });
  }
}
