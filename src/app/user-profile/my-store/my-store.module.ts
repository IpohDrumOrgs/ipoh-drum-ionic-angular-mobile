import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyStorePage } from './my-store.page';
import {AddInventoryPage} from './add-inventory/add-inventory.page';
import {NgSelect2Module} from 'ng-select2';
import {FormWizardModule} from 'angular-wizard-form/dist';

const routes: Routes = [
  {
    path: '',
    component: MyStorePage
  },
  {
    path: 'add-inventory',
    component: AddInventoryPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgSelect2Module,
        FormWizardModule,
        ReactiveFormsModule
    ],
  declarations: [
      MyStorePage,
      AddInventoryPage
  ]
})
export class MyStorePageModule {}
