import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ActionTypes, eventDispatcher } from '../auth-store/auth-store';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  @Output() registrationProcess =  new EventEmitter<{status: string, message: string}>();
  isProcessing: boolean;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ['']
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit(event: any) {
    if (this.isFormInvalid) {
      this.form.controls.password.markAsTouched();
      this.form.controls.email.markAsTouched();
      return;
    }
    event.preventDefault();
    const email = this.form.value.email;
    const password = this.form.value.password;
    eventDispatcher.next({
      name: ActionTypes.AUTH_PENDING
    });
    this.isProcessing = true;
    this.authService.registerAndSendEmailVerification({email, password}).subscribe(() => {
      this.isProcessing = false;
      this.router.navigate(['login'], {relativeTo: this.route.parent, queryParams: {keepStatus: true}});
      eventDispatcher.next({
        name: ActionTypes.AUTH_FINISHED,
        payload: {
          status: 'complete',
          message: 'Check your email' // TODO text
        }
      });
    }, err => {
      this.isProcessing = false;
      eventDispatcher.next({
        name: ActionTypes.AUTH_FINISHED,
        payload: {
          status: 'error',
          message: err.message
        }
      });
    });
  }

  get isPasswordMatch() {
    return this.form.controls.password.touched
      && this.form.controls.passwordConfirmation.touched
      && this.form.controls.passwordConfirmation.value !== this.form.controls.password.value;
  }

  get isFormInvalid() {
    return this.form.controls.password.invalid || this.form.controls.email.invalid;
  }

}
