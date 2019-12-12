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
import {ProductVariationModalPageModule} from '../shop/product-detail/product-variation-modal/product-variation-modal.module';
import {AddInventoryPageModule} from '../user-profile/my-store/add-inventory/add-inventory.module';
import {ProductVariationModalPage} from '../shop/product-detail/product-variation-modal/product-variation-modal.page';
import {AddInventoryPage} from '../user-profile/my-store/add-inventory/add-inventory.page';
import {SharedModule} from '../shared/shared.module';
import {FormWizardModule} from 'angular-wizard-form/dist';
// tslint:disable-next-line:max-line-length
import {InvFamilyPatternModalPageModule} from '../user-profile/my-store/add-inventory/inv-family-pattern-modal/inv-family-pattern-modal.module';
import {InvFamilyPatternModalPage} from '../user-profile/my-store/add-inventory/inv-family-pattern-modal/inv-family-pattern-modal.page';
// tslint:disable-next-line:max-line-length
import {AddInventoryPatternModalPageModule} from '../user-profile/my-store/add-inventory/inv-family-pattern-modal/add-inventory-pattern-modal/add-inventory-pattern-modal.module';
// tslint:disable-next-line:max-line-length
import {AddInventoryPatternModalPage} from '../user-profile/my-store/add-inventory/inv-family-pattern-modal/add-inventory-pattern-modal/add-inventory-pattern-modal.page';
// tslint:disable-next-line:max-line-length
import {StoreInventoryManagementModalPageModule} from '../user-profile/my-store/store-inventory-management-modal/store-inventory-management-modal.module';
// tslint:disable-next-line:max-line-length
import {StoreInventoryManagementModalPage} from '../user-profile/my-store/store-inventory-management-modal/store-inventory-management-modal.page';
import {InventoryManagementModalPageModule} from '../user-profile/my-store/inventory-management-modal/inventory-management-modal.module';
import {InventoryManagementModalPage} from '../user-profile/my-store/inventory-management-modal/inventory-management-modal.page';
import {InventoryDetailsModalPageModule} from '../user-profile/my-store/inventory-details-modal/inventory-details-modal.module';
import {InventoryDetailsModalPage} from '../user-profile/my-store/inventory-details-modal/inventory-details-modal.page';

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
        SharedModule,
        ShowHidePasswordModule,
        FormWizardModule,
        RouterModule.forChild(routes),
        ProductVariationModalPageModule,
        AddInventoryPageModule,
        InvFamilyPatternModalPageModule,
        AddInventoryPatternModalPageModule,
        StoreInventoryManagementModalPageModule,
        InventoryManagementModalPageModule,
        InventoryDetailsModalPageModule
    ],
    declarations: [
        IpohDrumPage,
        ErrorPageComponent,
        LoginRegisterComponent,
        ProductVariationModalPage,
        AddInventoryPage,
        InvFamilyPatternModalPage,
        AddInventoryPatternModalPage,
        StoreInventoryManagementModalPage,
        InventoryManagementModalPage,
        InventoryDetailsModalPage
    ]
})

export class IpohDrumPageModule {
}
