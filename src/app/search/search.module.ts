import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SearchPage } from './search.page';
import {SharedModule} from '../shared/shared.module';
import {IonicSelectableModule} from 'ionic-selectable';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule,
        IonicSelectableModule
    ],
  declarations: [SearchPage]
})

export class SearchPageModule {}
