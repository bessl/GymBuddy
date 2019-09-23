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
  private exerciseId: string;
  exercise: Observable<any>;
  sets: Observable<any>;
  hasSets = false;
  backLink = '/list';

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private exerciseService: ExerciseService,
    private setService: SetService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( p => {
      this.exerciseId = p.get('exerciseId');
      this.exercise = this.exerciseService.getExercise(this.exerciseId);
      this.sets = this.setService.getSetsByExercise(this.exerciseId);
      this.sets.subscribe(res => {
        this.hasSets = res.length > 0;
      });
    });
  }

  async addSet() {
    const addSetModal = await this.modalController.create({
      component: AddSetPage,
      componentProps: {
        exerciseId: this.exerciseId
      },
    });
    addSetModal.onDidDismiss().then((data) => {
      this.sets = this.setService.getSetsByExercise(this.exerciseId);
    });
    return await addSetModal.present();
  }

}
