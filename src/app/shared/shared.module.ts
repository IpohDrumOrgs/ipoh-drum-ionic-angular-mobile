import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';

@NgModule({
  declarations: [
    BottomMenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    BottomMenuComponent
  ]
})

export class SharedModule { }
