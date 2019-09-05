import { Injectable } from '@angular/core';
import { Exercise } from './models';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(
    private angularFireStore: AngularFirestore
  ) { }

  getExercises() {
    return this.angularFireStore.collection<Exercise>('exercise').snapshotChanges()
      .pipe(
        map(exercises => {
          return exercises.map(
            e => ({ id: e.payload.doc.id, ...e.payload.doc.data() })  // map document ID
          );
        })
      );
  }

  getExercise(exerciseID: string) {
    return this.angularFireStore
        .collection('exercise')
        .doc(exerciseID)
        .valueChanges();
  }
}
