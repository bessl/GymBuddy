import { Component, OnInit } from '@angular/core';
import {ExerciseService} from '../exercise.service';
import {Exercise} from '../models';
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
    this.exercises = this.exerciseService.getExercises();
  }

}
