import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './ipoh-drum/ipoh-drum.module#IpohDrumPageModule' },
  { path: 'my-profile', loadChildren: './user-profile/my-profile/my-profile.module#MyProfilePageModule' },
  { path: 'my-videos', loadChildren: './user-profile/my-videos/my-videos.module#MyVideosPageModule' },
  { path: 'my-store', loadChildren: './user-profile/my-store/my-store.module#MyStorePageModule' },
  { path: 'my-orders', loadChildren: './user-profile/my-orders/my-orders.module#MyOrdersPageModule' },
  { path: 'my-statistics', loadChildren: './user-profile/my-statistics/my-statistics.module#MyStatisticsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
