import { Component, OnInit } from '@angular/core';
import {ExerciseService} from '../exercise.service';
import {Exercise} from '../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  exercises: Exercise[] = [];

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.exercises = this.exerciseService.getExercises();
  }

}
