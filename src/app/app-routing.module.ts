import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: './ipoh-drum/ipoh-drum.module#IpohDrumPageModule'},
  { path: 'view-store-modal', loadChildren: './user-profile/my-store/view-store-modal/view-store-modal.module#ViewStoreModalPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
