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
    // registrationObs$.subscribe((res) => {
    //   const currentUserObs$ = from(this.afAuth.currentUser);
    //   currentUserObs$.subscribe((res1) => {
    //     const sendEmailObs$ = from(res.sendEmailVerification());
    //     currentUserObs$.subscribe((res2) => {
    //       console.log(res);
    //     });
    //   });
    // });
    // return merge(
    //   registrationObs$.pipe((res) => {
    //     console.log(res)
    //     return res;
    //   }),
    //   this.sendEmailVerification().pipe((res) => console.log(res)));
    // registrationObs$.subscribe(res => {
    //   console.log(res)
    //   return this.sendEmailVerification();
    // });
    // return this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  login(credentials) {
    return this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  sendEmailVerification() {
    // eturn this.afAuth.currentUser.sendEmailVerification;
  }


}
