import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyVideosPage } from './my-videos.page';
import {VgCoreModule} from 'videogular2/compiled/src/core/core';

const routes: Routes = [
  {
    path: '',
    component: MyVideosPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        VgCoreModule
    ],
  declarations: [MyVideosPage]
})
export class MyVideosPageModule {}
