import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor() {}

  passwordValidator(control: FormControl): { [key: string]: boolean } {
    const value = control.value;
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasValidLength = value ? value.length >= 8 : false;

    const errors = {};

    if (!hasUppercase) {
      errors['hasUppercase'] = true;
    }

    if (!hasNumber) {
      errors['hasNumber'] = true;
    }

    if (!hasSpecialCharacter) {
      errors['hasSpecialCharacter'] = true;
    }

    if (!hasValidLength) {
      errors['hasValidLength'] = true;
    }

    return errors;
  }
}
