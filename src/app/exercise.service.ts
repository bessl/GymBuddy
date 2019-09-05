import { Injectable } from '@angular/core';
import { Exercise } from './models';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private exercises: Exercise[] = [];

  constructor(
    private angularFireStore: AngularFirestore
  ) { }

  getExercises() {
    return this.angularFireStore
      .collection('exercise')
      .valueChanges();
  }

  getExercise(exerciseID: string) {
    return null;
    /*
    return this.getExercises().find(
        e => e.id === exerciseID
    );
     */
  }
}
