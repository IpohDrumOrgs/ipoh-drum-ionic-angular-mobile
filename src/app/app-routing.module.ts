import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'shop', pathMatch: 'full', component: ShopComponent},
  { path: 'shopping-cart', pathMatch: 'full', component: ShoppingCartComponent},
  { path: 'user-profile', pathMatch: 'full', component: UserProfileComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
