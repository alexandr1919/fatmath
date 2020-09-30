import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, merge } from 'rxjs';
import { User } from 'firebase';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(
    private afAuth: AngularFireAuth
  ) {}

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !==  null;
  }


  registerAndSendEmailVerification(credentials) {
    const registrationObs$ = from(this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password));
    return registrationObs$.pipe(
      concatMap(() => from(this.afAuth.currentUser).pipe(concatMap((user) => {
        return user.sendEmailVerification();
      })))
    );
  }

  login(credentials) {
    return from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password));
  }

  logout() {
    return from(this.afAuth.signOut());
  }

  resetPassword(credentials) {
    return from(this.afAuth.sendPasswordResetEmail(credentials.email));
  }

  getCurrentUser(){
    return from(this.afAuth.currentUser);
  }
}
