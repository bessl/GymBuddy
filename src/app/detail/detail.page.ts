import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExerciseService} from '../exercise.service';
import {Exercise} from '../models';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  exercise: Exercise;

  constructor(private activatedRoute: ActivatedRoute, private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( p => {
      const exerciseId = p.get('exerciseId');
      this.exercise = this.exerciseService.getExercise(exerciseId);
    });
  }

}
