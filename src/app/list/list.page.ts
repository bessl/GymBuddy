import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  exercises: Observable<any>;
  trainingsDay = '1';
  trainingsDaySelected = new BehaviorSubject('1');

  constructor(
    private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.trainingsDaySelected.next('1');
    this.exercises = this.exerciseService.getExercises(this.trainingsDaySelected.getValue());
  }

  changeTrainingsDay(day) {
    this.trainingsDaySelected.next(day);
    this.exercises = this.exerciseService.getExercises(day);
  }

}
