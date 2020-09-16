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


  }

  static get isLoggedIn() {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }


  register(credentials) {
    return this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  authSuccesfully() {
    console.log('1');
  }

}
