import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {IpohDrumPage} from './ipoh-drum.page';
import {ErrorPageComponent} from '../shared/error-page/error-page.component';
import {LoginRegisterComponent} from '../login-register/login-register.component';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';
import {CheckAuthenticatedService} from '../_dal/common/services/check-authenticated.service';

const routes: Routes = [
    {
        path: 'login',
        component: LoginRegisterComponent,
        canActivate: []
    },
    {
        path: 'ipoh-drum',
        component: IpohDrumPage,
        children: [
            {path: '', pathMatch: 'full', redirectTo: '/ipoh-drum/home'},
            {path: 'home', loadChildren: '../home/home.module#HomePageModule'},
            {path: 'shop', loadChildren: '../shop/shop.module#ShopPageModule'},
            {path: 'shopping-cart', loadChildren: '../shopping-cart/shopping-cart.module#ShoppingCartPageModule'},
            {path: 'user-profile',
                loadChildren: '../user-profile/user-profile.module#UserProfilePageModule',
                canActivate: [CheckAuthenticatedService]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/ipoh-drum/home',
        pathMatch: 'full'
    },
    {path: '**', redirectTo: 'error-page', pathMatch: 'full'},
    {path: 'error-page', component: ErrorPageComponent}
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        ShowHidePasswordModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        IpohDrumPage,
        ErrorPageComponent,
        LoginRegisterComponent
    ]
})
export class IpohDrumPageModule {
}
