import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DetailPage } from './detail.page';
import { AddSetPageModule } from '../add-set/add-set.module';
import { DateformaterPipe} from '../dateformater.pipe';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DetailPage
  }
];

@NgModule({
  imports: [
    AddSetPageModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [DetailPage, DateformaterPipe]
})
export class DetailPageModule {}
