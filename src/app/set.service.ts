import { Injectable } from '@angular/core';
import { Set } from './models';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  defaultSetValuesSubject = new BehaviorSubject<{ weight: number, repetitions: number }>({weight: null, repetitions: null});
  private header;

  constructor(
    private http: HttpClient,
    private apiService: ApiService) {
      this.header = {
        headers: new HttpHeaders().set('Authorization',  `Bearer ${apiService.authToken.getValue()}`)
      };
  }

  addSet(set: Set) {
    return this.http.post(`${environment.APIServerURL}/api/v1/sets`, set, this.header);
  }

  getSetsByExercise(exerciseId: string) {
    return this.http.get(`${environment.APIServerURL}/api/v1/sets/by_exercise/${exerciseId}`, this.header);
  }

  getLastWeightValueByExercise(exerciseId: string) {
    this.http.get(`${environment.APIServerURL}/api/v1/exercises/${exerciseId}/last_weight`, this.header).subscribe((sets: any) => {
      this.defaultSetValuesSubject.next(
      (sets.length === 1) ?
        {weight: sets[0].weight, repetitions: sets[0].repetitions} :
        {weight: null, repetitions: null}
      );
    });
  }
}
