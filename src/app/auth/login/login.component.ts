import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { from } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { ActionTypes, eventDispatcher } from '../auth-store/auth-store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  onSubmit() {
    const email = this.form.controls.email;
    const password = this.form.controls.password;
    if (this.form.invalid) {
      email.markAsTouched();
      password.markAsTouched();
      return;
    }
    eventDispatcher.next({
      name: ActionTypes.AUTH_PENDING
    });
    const loginObservable = from(this.authService.login({email: email.value, password: password.value}));
    loginObservable.subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
      eventDispatcher.next({
        name: ActionTypes.AUTH_FINISHED,
        payload: {
          status: 'error',
          message: err.message
        }
      });
    });
  }

}
