import { Injectable } from '@angular/core';
import { Exercise } from './models';
import { AngularFirestore } from '@angular/fire/firestore';
import {first, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { GYMBUDDY_API_CONGIG } from './secrets';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private header = {
    headers: new HttpHeaders().set('Authorization',  `Bearer ${GYMBUDDY_API_CONGIG.authToken}`)
  };

  constructor(
    private angularFireStore: AngularFirestore,
    private http: HttpClient
  ) {
  }

  getExercises(trainingsDay: string) {
    return this.http.get(`${GYMBUDDY_API_CONGIG.url}/api/v1/exercises/by_day/${trainingsDay}`, this.header);
  }

  getExercise(exerciseID: string) {
    return this.http.get(`${GYMBUDDY_API_CONGIG.url}/api/v1/exercises/${exerciseID}`, this.header)
      .pipe(
        map(array => array[0])  // get the first element of array
      );
  }
}
