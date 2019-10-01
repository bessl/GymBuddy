import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private header;

  constructor(
    private http: HttpClient,
    private apiService: ApiService) {
      this.header = {
        headers: new HttpHeaders().set('Authorization',  `Bearer ${apiService.authToken.getValue()}`)
      };
  }

  getExercises(trainingsDay: string) {
    return this.http.get(`${environment.APIServerURL}/api/v1/exercises/by_day/${trainingsDay}`, this.header);
  }

  getExercise(exerciseID: string) {
    return this.http.get(`${environment.APIServerURL}/api/v1/exercises/${exerciseID}`, this.header)
      .pipe(
        map(array => array[0])  // get the first element of array
      );
  }
}
