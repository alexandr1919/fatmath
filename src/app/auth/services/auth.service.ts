import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) {

  }


  register(credentials) {
    const observable = from(this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password));
    observable.subscribe(res => {
      console.log(res)
      this.authSuccesfully();
    }, err => {
      console.log(err);
    });
  }

  authSuccesfully() {
    console.log('1');
  }

}
