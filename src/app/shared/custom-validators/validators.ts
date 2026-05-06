import { AbstractControl, ValidationErrors } from "@angular/forms";

export function customEmailValidator(control: AbstractControl): ValidationErrors | null {

  const email = control.value;

  if (!email) return null;

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}$/;

  return regex.test(email) ? null : { invalidEmail: true }

}

export function confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {

  const password = control.get('password')?.value;
  const confPassword = control.get('confirmpassword')?.value;

  if (!confPassword || !password) return null;
  return (password === confPassword) ? null : { invalidPass: true }
}
