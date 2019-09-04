import { Injectable } from '@angular/core';
import { Exercise } from './models';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private exercises: Exercise[] = [
    {id: 'HYLTw5lNPNNu9w', title: 'Leg press', imgUrl: 'https://placeimg.com/200/200/tech'},
    {id: 'AELTwSAS11ewra', title: 'Shoulder press', imgUrl: 'https://placeimg.com/200/200/nature'},
    {id: 'DKdeedd12Ad21a', title: 'Arm curl', imgUrl: 'https://placeimg.com/200/200/arch'}
  ];

  constructor() { }

  getExercises() {
    return this.exercises;
  }
}
