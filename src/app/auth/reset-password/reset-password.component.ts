import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { ActionTypes, eventDispatcher } from '../auth-store/auth-store';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  isProcessing: boolean;
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
  loginObservable$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onSubmit() {
    const email = this.form.controls.email;
    if (this.form.invalid) {
      this.form.controls.email.markAsTouched();
      return;
    }
    this.isProcessing = true;
    eventDispatcher.next({
      name: ActionTypes.AUTH_PENDING
    });
    this.loginObservable$ = from(this.authService.resetPassword({email: email.value}));
    this.loginObservable$.subscribe(() => {
      this.isProcessing = false;
      this.router.navigate(['login'], {relativeTo: this.route.parent, queryParams: {keepStatus: true}});
      eventDispatcher.next({
        name: ActionTypes.AUTH_FINISHED,
        payload: {
          status: 'complete',
          message: 'Check your email' // TODO text
        }
      });
    }, (err) => {
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

}
