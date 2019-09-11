import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Set } from './models';
import { filter, map, first } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  defaultSetValuesSubject = new BehaviorSubject<{ weight: number, repetitions: number }>({weight: null, repetitions: null});

  constructor(
    private angularFirestore: AngularFirestore) {
  }

  addSet(set: Set) {
    this.angularFirestore
      .collection('sets')
      .add(set);
  }

  getSetsByExercise(exerciseId: string) {
    return this.angularFirestore.collection(
        'sets',
        ref => ref.where(
          'exerciseId', '==', exerciseId)
          .orderBy('createdAt', 'desc')
          .limit(6)
        )
        .valueChanges();
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
