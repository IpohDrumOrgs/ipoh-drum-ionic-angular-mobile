import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { HomePage } from './home.page';
import {SaleVideosComponent} from './sale-videos/sale-videos.component';
import {SaleArticlesComponent} from './sale-articles/sale-articles.component';
import {SharedModule} from '../shared/shared.module';
import {MyVideosCollectionComponent} from './my-videos-collection/my-videos-collection.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [
        HomePage,
        SaleVideosComponent,
        SaleArticlesComponent,
        MyVideosCollectionComponent
    ]
})

export class HomePageModule {}
