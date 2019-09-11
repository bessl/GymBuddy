import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  exercises: Observable<any>;

  constructor(
    private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.exercises = this.exerciseService.getExercises('1');
  }

  changeDayFilter(event: any) {
    this.exercises = this.exerciseService.getExercises(event.detail.value);
  }

}
