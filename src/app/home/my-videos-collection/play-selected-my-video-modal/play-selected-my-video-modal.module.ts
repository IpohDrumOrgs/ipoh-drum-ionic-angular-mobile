import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PlaySelectedMyVideoModalPage } from './play-selected-my-video-modal.page';

const routes: Routes = [
  {
    path: 'play-selected-my-video-modal',
    component: PlaySelectedMyVideoModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})

export class PlaySelectedMyVideoModalPageModule {}
