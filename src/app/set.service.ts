import { Injectable } from '@angular/core';
import { Set } from './models';
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
    private http: HttpClient) {
  }

  addSet(set: Set) {
    return this.http.post(`${GYMBUDDY_API_CONGIG.url}/api/v1/sets`, set, this.header);
  }

  getSetsByExercise(exerciseId: string) {
    return this.http.get(`${GYMBUDDY_API_CONGIG.url}/api/v1/sets/by_exercise/${exerciseId}`, this.header);
  }

  getLastWeightValueByExercise(exerciseId: string) {
    this.http.get(`${GYMBUDDY_API_CONGIG.url}/api/v1/exercises/${exerciseId}/last_weight`, this.header).subscribe(d => {
      this.defaultSetValuesSubject.next(
          {weight: 23, repetitions: 23}
          // d.length === 1 ? {weight: d[0].weight, repetitions: d[0].repetitions} : {weight: null, repetitions: null}
      );
    });
  }
}
