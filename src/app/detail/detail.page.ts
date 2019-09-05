import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../exercise.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import {AddSetPage} from '../add-set/add-set.page';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  exercise: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( p => {
      this.exercise = this.exerciseService.getExercise(p.get('exerciseId'));
    });
  }

  async addSet() {
    const addSetModal = await this.modalController.create({
      component: AddSetPage
    });
    return await addSetModal.present();
  }

}
