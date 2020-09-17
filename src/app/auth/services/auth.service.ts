import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.setItem('user', null);
      }

      console.log(localStorage.getItem('user'));
      console.log(JSON.parse(localStorage.getItem('user')));

    });


  }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !==  null;
  }


  register(credentials) {
    return this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  login(credentials) {
    return this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }


}
