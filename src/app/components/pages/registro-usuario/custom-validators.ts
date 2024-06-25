import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (!email) {
      return null; 
    }
    const pattern = /^[^@\s]+@[^@\s]+\.(com|es)$/; 
    const valid = pattern.test(email);
    return valid ? null : { invalidEmail: true };
  };
}
