import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (!email) {
      return null; 
    }
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(com|es)$/;
    const valid = pattern.test(email);
    return valid ? null : { invalidEmail: true };
  };
}
