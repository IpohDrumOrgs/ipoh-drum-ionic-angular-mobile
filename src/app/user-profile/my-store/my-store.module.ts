import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyStorePage } from './my-store.page';
import {NgSelect2Module} from 'ng-select2';

const routes: Routes = [
  {
    path: '',
    component: MyStorePage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgSelect2Module,
        ReactiveFormsModule,
    ],
  declarations: [
      MyStorePage
  ]
})

export class MyStorePageModule {}
