import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

/**
 * Creates an email validator that also rejects the configured default value.
 * @param defaultValue Default value used as placeholder and validation boundary.
 */
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
  constructor(private http: HttpClient) {}
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

  /**
   * Initializes the component state.
   */
   ngOnInit() {
    this.loadDefaultValues();
    this.applyDefaultValuesToForm();
    this.contactForm.get('consent')?.valueChanges.subscribe(() => (this.showConsentError = false));
    this.translate.onLangChange.subscribe(() => {
      const prev = { ...this.defaultValues };
      this.loadDefaultValues();
      this.updateFieldsOnLanguageChange(prev);
    });
  }
  
  /**
   * Loads language-dependent default values for all contact form fields.
   */
   loadDefaultValues() {
    this.defaultValues = {
      name: this.translate.instant('CONTACT_FORM.DEFAULT_NAME'),
      email: this.translate.instant('CONTACT_FORM.DEFAULT_EMAIL'),
      message: this.translate.instant('CONTACT_FORM.DEFAULT_MESSAGE'),
    };
  }

  /**
   * Applies the currently loaded defaults to the contact form controls.
   */
   applyDefaultValuesToForm() {
    this.setTextControl('name', 2);
    this.setEmailControl();
    this.setTextControl('message', 5);
  }

  /**
   * Updates all relevant form fields after language changes.
   * @param prev Previous defaults captured before language switching.
   */
   updateFieldsOnLanguageChange(prev: Record<string, string>) {
    ['name', 'email', 'message'].forEach((field) => this.syncFieldOnLanguageChange(field, prev));
  }

  /**
   * Configures a text control with defaults and validators.
   * @param field Name of the affected form field.
   * @param minLength Required minimum length for the target field.
   */
   private setTextControl(field: 'name' | 'message', minLength: number) {
    const defaultValue = this.defaultValues[field];
    this.contactForm.setControl(
      field,
      new FormControl(defaultValue, [
        Validators.required,
        Validators.minLength(minLength),
        this.isNotDefault(defaultValue),
      ]),
    );
  }

  /**
   * Configures the email control including its dedicated validators.
   */
   private setEmailControl() {
    const defaultValue = this.defaultValues['email'];
    this.contactForm.setControl(
      'email',
      new FormControl(defaultValue, [emailWithDefaultValidator(defaultValue)]),
    );
  }

  /**
   * Synchronizes one form field after a language change.
   * @param field Name of the affected form field.
   * @param prev Previous defaults captured before language switching.
   */
   private syncFieldOnLanguageChange(field: string, prev: Record<string, string>) {
    const control = this.contactForm.get(field);
    const oldDefault = prev[field];
    const newDefault = this.defaultValues[field];
    if (!control) return;
    if (control.value === '' || control.value === oldDefault) {
      control.setValue(newDefault);
      control.markAsUntouched();
    }
    this.setFieldValidators(field, newDefault, control);
    control.updateValueAndValidity({ emitEvent: false });
  }

  /**
   * Updates control validators according to the target field type.
   * @param field Name of the affected form field.
   * @param newDefault New default value after language switching.
   * @param control Form control instance that should be updated.
   */

   private setFieldValidators(field: string, newDefault: string, control: AbstractControl) {
    if (field === 'email') {
      control.setValidators([emailWithDefaultValidator(newDefault)]);
      return;
    }
    control.setValidators([
      Validators.required,
      Validators.minLength(5),
      this.isNotDefault(newDefault),
    ]);
  }

  /**
   * Creates a validator that rejects the field default value.
   * @param defaultValue Default value used as placeholder and validation boundary.
   */
   isNotDefault(defaultValue: string) {
    return (control: AbstractControl) =>
      control.value === defaultValue ? { defaultValue: true } : null;
  }
  /**
   * Checks whether a form field is touched and currently invalid.
   * @param field Name of the affected form field.
   * @returns Computed method result.
   */
  isInvalid(field: string): boolean {
    const c = this.contactForm.get(field);
    return !!(c && c.touched && c.invalid);
  }

  /**
   * Checks whether the default-value error should be shown for a field.
   * @param field Name of the affected form field.
   * @returns Computed method result.
   */
   showDefaultError(field: string): boolean {
    const c = this.contactForm.get(field);
    return !!(c && c.touched && c.invalid && c.value === this.defaultValues[field]);
  }

  /**
   * Resets a field state and clears its visible error state.
   * @param field Name of the affected form field.
   */
   clearError(field: string) {
    const control = this.contactForm.get(field);
    if (!control) return;
    const defaultValue = this.defaultValues[field];
    if (control.value === defaultValue) control.setValue('');
    control.markAsUntouched();
  }

  /**
   * Validates a field after blur and restores default text when needed.
   * @param field Name of the affected form field.
   */
   validateField(field: string) {
    const control = this.contactForm.get(field);
    if (!control) return;
    const defaultValue = this.defaultValues[field];
    if (!control.value || control.value.trim() === '') control.setValue(defaultValue);
    control.markAsTouched();
    control.updateValueAndValidity();
  }

  /**
   * Marks controls as touched when submit is attempted with invalid data.
   */
   onDisabledSubmitAttempt() {
    if (!this.contactForm.valid) {
      Object.values(this.contactForm.controls).forEach((c) => c.markAsTouched());
      if (this.contactForm.get('consent')?.invalid) this.showConsentError = true;
    }
  }

  /**
   * Starts the contact form submit flow.
   */
   onSubmit() {
    if (this.contactForm.invalid) return;
    const formData = this.getFormData();
    this.setSubmittingState();
    this.http.post('send_mail.php', formData, { responseType: 'json' }).subscribe({
      next: () => this.handleSubmitSuccess(),
      error: () => this.handleSubmitError(),
    });
  }

  /**
   * Builds the payload object from the current form values.
   */
   private getFormData() {
    return {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message,
    };
  }

  /**
   * Sets the UI status to the in-progress submit state.
   */
   private setSubmittingState() {
    this.loading = true;
    this.success = false;
    this.error = false;
  }

  /**
   * Handles the successful submit flow and resets the UI status afterwards.
   */
   private handleSubmitSuccess() {
    this.loading = false;
    this.success = true;
    this.contactForm.reset();
    this.contactForm.get('consent')?.setValue(false);
    setTimeout(() => {
      this.success = false;
    }, 2000);
  }

  /**
   * Handles the failed submit flow and resets the UI status afterwards.
   */
   private handleSubmitError() {
    this.loading = false;
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 5000);
  }
}
