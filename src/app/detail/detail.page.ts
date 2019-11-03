import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../exercise.service';
import { Observable, interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import {AddSetPage} from '../add-set/add-set.page';
import {SetService} from '../set.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {
  private exerciseId: string;
  exercise: Observable<any>;
  sets: Observable<any>;
  hasSets = false;
  backLink = '/list';
  countdownIsRunning = false;
  subscriptionCountdown: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private exerciseService: ExerciseService,
    private localNotifications: LocalNotifications,
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

  ngOnDestroy() {
    this.subscriptionCountdown.unsubscribe();
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

  startCountdown() {
    const countdownSeconds = 5;
    this.countdownIsRunning = true;
    this.subscriptionCountdown = interval(1000).pipe(take(countdownSeconds)).subscribe(
      x => {
        if (x === countdownSeconds - 1) {  // last iteration
          this.countdownIsRunning = false;
          this.localNotifications.schedule({
            id: 1,
            text: 'Start next workout now!',
            led: 'FF0000',
            vibrate: true,
            sound: null
          });
        }
      }
    );
  }

}
