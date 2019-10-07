import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  exercises: Observable<any>;
  title = 'Exercises';
  displayDay = new BehaviorSubject('1');

  constructor(
    private exerciseService: ExerciseService) {
  }

  ngOnInit() {
  }

  showExercises() {
    this.exercises = this.exerciseService.getExercises(this.displayDay.getValue());
  }

  changeDayFilter(event: any) {
    this.displayDay.next(event.detail.value);
    this.showExercises();
  }

  ionViewWillEnter() {
    this.showExercises();
  }

}
