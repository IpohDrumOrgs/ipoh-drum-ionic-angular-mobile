import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyStorePage } from './my-store.page';
import {AddInventoryPage} from './add-inventory/add-inventory.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [
      MyStorePage,
      AddInventoryPage
  ]
})
export class MyStorePageModule {}
