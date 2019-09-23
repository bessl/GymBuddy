import { Injectable } from '@angular/core';
import { Exercise } from './models';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { GYMBUDDY_API_CONGIG } from './secrets';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(
    private angularFireStore: AngularFirestore,
    private http: HttpClient
  ) {
  }

  getExercises(trainingsDay: string) {
      const header = {
          headers: new HttpHeaders().set('Authorization',  `Bearer ${GYMBUDDY_API_CONGIG.authToken}`)
      };
      this.http.get(
        `${GYMBUDDY_API_CONGIG.url}/api/v1/exercises/by_day/${trainingsDay}`, header)
    .subscribe(s => {
        console.log(s);
    });

    return this.angularFireStore.collection<Exercise>(
        'exercise', ref => ref.where('day', '==', +trainingsDay).orderBy('title'))
        .snapshotChanges()
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
