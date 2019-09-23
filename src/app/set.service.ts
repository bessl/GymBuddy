import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Set } from './models';
import { filter, map, first } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GYMBUDDY_API_CONGIG } from './secrets';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  defaultSetValuesSubject = new BehaviorSubject<{ weight: number, repetitions: number }>({weight: null, repetitions: null});
  private header = {
    headers: new HttpHeaders().set('Authorization',  `Bearer ${GYMBUDDY_API_CONGIG.authToken}`)
  };

  constructor(
    private http: HttpClient,
    private angularFirestore: AngularFirestore) {
  }

  addSet(set: Set) {
    return this.http.post(`${GYMBUDDY_API_CONGIG.url}/api/v1/sets`, set, this.header);
  }

  getSetsByExercise(exerciseId: string) {
    return this.http.get(`${GYMBUDDY_API_CONGIG.url}/api/v1/sets/by_exercise/${exerciseId}`, this.header);
  }

  getLastWeightValueByExercise(exerciseId: string) {
    this.angularFirestore.collection<Set>(
        'sets',
        ref => ref
            .where('exerciseId', '==', exerciseId)
            .where('rating', '==', 1)
            .orderBy('createdAt', 'desc')
            .limit(1)
    )
        .valueChanges()
        // .pipe<Set[]>(filter(d => d.length === 1))
        .subscribe(d => {
          this.defaultSetValuesSubject.next(
            d.length === 1 ? {weight: d[0].weight, repetitions: d[0].repetitions} : {weight: null, repetitions: null}
          );
        });
  }
}
