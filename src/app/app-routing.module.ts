import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileDetailsComponent } from './user-profile/user-profile-details/user-profile-details.component';
import { MyVideosComponent } from './user-profile/my-videos/my-videos.component';
import { MyStoreComponent } from './user-profile/my-store/my-store.component';
import { MyOrdersComponent } from './user-profile/my-orders/my-orders.component';
import { MyStatisticsComponent } from './user-profile/my-statistics/my-statistics.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', pathMatch: 'full', component: LoginComponent},
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'shop', pathMatch: 'full', component: ShopComponent},
  { path: 'shopping-cart', pathMatch: 'full', component: ShoppingCartComponent},
  { path: 'user-profile', component: UserProfileComponent, children: [
    { path: '', pathMatch: 'full', component: UserProfileDetailsComponent},
    { path: 'my-videos', component: MyVideosComponent},
    { path: 'my-store', component: MyStoreComponent},
    { path: 'my-orders', component: MyOrdersComponent},
    { path: 'my-statistics', component: MyStatisticsComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
