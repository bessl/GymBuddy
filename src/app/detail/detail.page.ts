import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../exercise.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import {AddSetPage} from '../add-set/add-set.page';
import {SetService} from '../set.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  exercise: Observable<any>;
  sets: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private exerciseService: ExerciseService,
    private setService: SetService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( p => {
      const exerciseId = p.get('exerciseId');
      this.exercise = this.exerciseService.getExercise(exerciseId);
      this.sets = this.setService.getSetsByExercise(exerciseId);
    });
  }

  async addSet() {
    const addSetModal = await this.modalController.create({
      component: AddSetPage
    });
    return await addSetModal.present();
  }

}
