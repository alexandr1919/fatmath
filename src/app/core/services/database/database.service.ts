import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private db: AngularFirestore
  ) { }

  getCollection(collection) {
    return this.db.collection(collection);
  }
}
