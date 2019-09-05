import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Set } from './models';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  constructor(
    private angularFirestore: AngularFirestore) {
  }

  addSet(set: Set) {
    this.angularFirestore
      .collection('sets')
      .add(set);
  }

  getSetsByExercise(exerciseId: string) {
    return this.angularFirestore.collection('sets',
        ref => ref.where('exerciseId', '==', exerciseId))
        .valueChanges();
  }
}
