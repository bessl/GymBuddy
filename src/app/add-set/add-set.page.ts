import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-set',
  templateUrl: './add-set.page.html',
  styleUrls: ['./add-set.page.scss'],
})
export class AddSetPage implements OnInit {
  setFormGroup: FormGroup;

  constructor(
    navParams: NavParams,
    private modalController: ModalController,
    formBuilder: FormBuilder) {
    this.setFormGroup = formBuilder.group({
      weight: ['', [Validators.required]],
      repetitions: ['', [Validators.required]],
      rating: [''],
    });
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  addSet() {
    console.log('add set form sent.');
    console.log(this.setFormGroup.value.rating);
  }

}
