import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ShopPage } from './shop.page';
import {NgImageSliderModule} from 'ng-image-slider';
import {ProductDetailPage} from './product-detail/product-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ShopPage
  },
  {
    path: 'product-detail/:uid',
    component: ProductDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgImageSliderModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
      ShopPage,
      ProductDetailPage
  ]
})
export class ShopPageModule {}