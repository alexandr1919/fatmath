import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  @ViewChild('passwordConfirmationInput') passwordConfirmationInput;
  isMismatchError: boolean;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(6)]],
    passwordConfirmation: ['', Validators.min(6)]
  });

  errorMessages = {
    passwordMismatch: 'Password doesn\'t match',
    passwordMinLength: 'Password should be at least 6 symbols length',
    emailTaken: 'Email has already been taken'
  };

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {

  }


  get passwordErrors() {
    console.log(this.form.controls.password)
    const passwordField = this.form.value.password;
    return passwordField.errors;
  }


  onSubmit(event) {
    this.isMismatchError = false;
    event.preventDefault();
    const password = this.form.value.password;
    const passwordConfirmation = this.form.value.passwordConfirmation;
    if (password !== passwordConfirmation) {
      this.isMismatchError = true;
      return;
    }
    //this.authService.register()
  }

  get isPasswordMatch() {
    // tslint:disable-next-line:max-line-length
    return this.form.controls.password.touched && this.form.controls.passwordConfirmation.touched && this.form.controls.passwordConfirmation.value !== this.form.controls.password.value;
  }

}
