import { Component } from '@angular/core';
import { authStore } from './auth-store/auth-store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  authState: string;
  authMessage: string;

  constructor() {
    localStorage.setItem('user', null)
    authStore.subscribe(state => {
      console.log(state)
      if (state.status === 'pending') {
        this.authState = null;
        return;
      }
      this.authState = state.status;
      this.authMessage = state.message;
    });
  }

  onActivate() {
    this.authState = null;
  }

}
