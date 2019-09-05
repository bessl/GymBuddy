import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-set',
  templateUrl: './add-set.page.html',
  styleUrls: ['./add-set.page.scss'],
})
export class AddSetPage implements OnInit {

  constructor(
    navParams: NavParams,
    private modalController: ModalController) {
    // this.videoURL = navParams.get("videoURL");
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
