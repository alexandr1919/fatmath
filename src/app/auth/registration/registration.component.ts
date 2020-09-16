import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { thistle } from 'color-name';
import { from } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  @Output() registrationProcess =  new EventEmitter<{status: string, message: string}>();


  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ['']
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

  get isFormInvalid() {
    return this.form.controls.password.invalid || this.form.controls.email.invalid
  }

  onSubmit(event) {
    if (this.isFormInvalid) return;
    const email = this.form.value.email;
    const password = this.form.value.password;
    event.preventDefault();
    this.form.controls.password.markAsTouched();
    this.form.controls.email.markAsTouched();
    const registerObservable = from(this.authService.register({email, password}));
    registerObservable.subscribe(res => {
      console.log(res);
    }, err => {
      this.registrationProcess.emit({status: 'error', message: err.message});
    });
  }

  get isPasswordMatch() {
    return this.form.controls.password.touched
      && this.form.controls.passwordConfirmation.touched
      && this.form.controls.passwordConfirmation.value !== this.form.controls.password.value;
  }

}
