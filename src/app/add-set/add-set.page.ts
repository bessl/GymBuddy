import {Component, Input, OnInit} from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetService } from '../set.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-add-set',
  templateUrl: './add-set.page.html',
  styleUrls: ['./add-set.page.scss'],
})
export class AddSetPage implements OnInit {
  @Input() exerciseId: string;
  setFormGroup: FormGroup;

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
