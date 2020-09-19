import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { authStore } from './auth-store/auth-store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy {
  authState: string;
  authMessage: string;
  keepStatus: boolean;
  private queryParamsSubscription$: Subscription;


  constructor(private route: ActivatedRoute) {
    authStore.subscribe(state => {
      if (state.status === 'pending') {
        this.authState = null;
        return;
      }
      this.authState = state.status;
      this.authMessage = state.message;
    });
  }

  onActivate(event) {
    event.route && event.route.queryParams.subscribe((params) => {
      console.log(this.keepStatus)
      this.keepStatus = params.keepStatus;
    });
    if (!this.keepStatus) this.authState = null;
  }

  ngOnDestroy() {
    this.queryParamsSubscription$ && this.queryParamsSubscription$.unsubscribe();
  }

}
