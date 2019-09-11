import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetService } from '../set.service';
import { UserService } from '../user.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-add-set',
  templateUrl: './add-set.page.html',
  styleUrls: ['./add-set.page.scss'],
})
export class AddSetPage implements OnInit, OnDestroy {
  @Input() exerciseId: string;
  setFormGroup: FormGroup;
  setWeightValue: number;
  setRepetitionsValue: number;
  defaultSetValuesSubject: Subscription;

  constructor(
    navParams: NavParams,
    private modalController: ModalController,
    private setService: SetService,
    private userService: UserService,
    formBuilder: FormBuilder) {
    this.setFormGroup = formBuilder.group({
      weight: ['', [Validators.required]],
      repetitions: ['', [Validators.required]],
      rating: ['1'],
    });
  }

  ngOnInit() {
    this.setService.getLastWeightValueByExercise(this.exerciseId);
    this.defaultSetValuesSubject = this.setService.defaultSetValuesSubject.subscribe(d => {
      this.setWeightValue = d.weight;
      this.setRepetitionsValue = d.repetitions;
    });
  }

  ngOnDestroy(): void {
    this.defaultSetValuesSubject.unsubscribe();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  addSet() {
    this.setService.addSet({
      createdAt: new Date().getTime(),
      createdBy: this.userService.getUid(),
      exerciseId: this.exerciseId,
      repetitions: +this.setFormGroup.value.repetitions,
      weight: +this.setFormGroup.value.weight,
      rating: +this.setFormGroup.value.rating
    });
    this.closeModal();
  }

}
