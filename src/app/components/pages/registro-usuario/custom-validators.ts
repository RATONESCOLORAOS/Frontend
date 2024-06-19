import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (!email) {
      return null; // Considera que otros validadores manejan 'required'
    }
    const pattern = /^[^@\s]+@[^@\s]+\.(com|es)$/; // Ajusta la expresión regular según necesites
    const valid = pattern.test(email);
    return valid ? null : { invalidEmail: true };
  };
}
