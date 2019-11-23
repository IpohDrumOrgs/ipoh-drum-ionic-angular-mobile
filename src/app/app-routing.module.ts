import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './ipoh-drum/ipoh-drum.module#IpohDrumPageModule' },
  { path: 'product-variation-modal', loadChildren: './shop/product-detail/product-variation-modal/product-variation-modal.module#ProductVariationModalPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
