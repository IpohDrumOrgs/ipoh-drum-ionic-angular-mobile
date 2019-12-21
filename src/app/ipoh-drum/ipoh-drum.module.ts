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
import {AddStoreModalPage} from '../user-profile/my-store/add-store-modal/add-store-modal.page';
import {AddStoreModalPageModule} from '../user-profile/my-store/add-store-modal/add-store-modal.module';
import { IonicSelectableModule } from 'ionic-selectable';
import {EditStoreModalPageModule} from '../user-profile/my-store/edit-store-modal/edit-store-modal.module';
import {EditStoreModalPage} from '../user-profile/my-store/edit-store-modal/edit-store-modal.page';
import {PromotionManagementModalPageModule} from '../user-profile/my-store/promotion-management-modal/promotion-management-modal.module';
import {PromotionManagementModalPage} from '../user-profile/my-store/promotion-management-modal/promotion-management-modal.page';
// tslint:disable-next-line:max-line-length
import {AddPromotionModalPageModule} from '../user-profile/my-store/promotion-management-modal/add-promotion-modal/add-promotion-modal.module';
import {AddPromotionModalPage} from '../user-profile/my-store/promotion-management-modal/add-promotion-modal/add-promotion-modal.page';
import {WarrantyManagementModalPageModule} from '../user-profile/my-store/warranty-management-modal/warranty-management-modal.module';
import {WarrantyManagementModalPage} from '../user-profile/my-store/warranty-management-modal/warranty-management-modal.page';
import {AddWarrantyModalPageModule} from '../user-profile/my-store/warranty-management-modal/add-warranty-modal/add-warranty-modal.module';
import {AddWarrantyModalPage} from '../user-profile/my-store/warranty-management-modal/add-warranty-modal/add-warranty-modal.page';
import {ShippingManagementModalPageModule} from '../user-profile/my-store/shipping-management-modal/shipping-management-modal.module';
import {ShippingManagementModalPage} from '../user-profile/my-store/shipping-management-modal/shipping-management-modal.page';
import {AddShippingModalPageModule} from '../user-profile/my-store/shipping-management-modal/add-shipping-modal/add-shipping-modal.module';
import {AddShippingModalPage} from '../user-profile/my-store/shipping-management-modal/add-shipping-modal/add-shipping-modal.page';
// tslint:disable-next-line:max-line-length
import {EditPromotionModalPageModule} from '../user-profile/my-store/promotion-management-modal/edit-promotion-modal/edit-promotion-modal.module';
import {EditPromotionModalPage} from '../user-profile/my-store/promotion-management-modal/edit-promotion-modal/edit-promotion-modal.page';
import {EditWarrantyModalPage} from '../user-profile/my-store/warranty-management-modal/edit-warranty-modal/edit-warranty-modal.page';
// tslint:disable-next-line:max-line-length
import {EditWarrantyModalPageModule} from '../user-profile/my-store/warranty-management-modal/edit-warranty-modal/edit-warranty-modal.module';
// tslint:disable-next-line:max-line-length
import {EditShippingModalPageModule} from '../user-profile/my-store/shipping-management-modal/edit-shipping-modal/edit-shipping-modal.module';
import {EditShippingModalPage} from '../user-profile/my-store/shipping-management-modal/edit-shipping-modal/edit-shipping-modal.page';
import {CheckUnauthenticatedService} from '../_dal/common/services/check-unauthenticated.service';
import {VoucherManagementModalPageModule} from '../user-profile/my-store/voucher-management-modal/voucher-management-modal.module';
import {VoucherManagementModalPage} from '../user-profile/my-store/voucher-management-modal/voucher-management-modal.page';
import {AddVoucherModalPageModule} from '../user-profile/my-store/voucher-management-modal/add-voucher-modal/add-voucher-modal.module';
import {AddVoucherModalPage} from '../user-profile/my-store/voucher-management-modal/add-voucher-modal/add-voucher-modal.page';
import {EditVoucherModalPage} from '../user-profile/my-store/voucher-management-modal/edit-voucher-modal/edit-voucher-modal.page';
import {EditVoucherModalPageModule} from '../user-profile/my-store/voucher-management-modal/edit-voucher-modal/edit-voucher-modal.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/ipoh-drum/home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginRegisterComponent,
        canActivate: [CheckUnauthenticatedService]
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
        IonicSelectableModule,
        RouterModule.forChild(routes),
        ProductVariationModalPageModule,
        AddInventoryPageModule,
        InvFamilyPatternModalPageModule,
        AddInventoryPatternModalPageModule,
        StoreInventoryManagementModalPageModule,
        InventoryManagementModalPageModule,
        InventoryDetailsModalPageModule,
        AddStoreModalPageModule,
        EditStoreModalPageModule,
        PromotionManagementModalPageModule,
        AddPromotionModalPageModule,
        EditPromotionModalPageModule,
        WarrantyManagementModalPageModule,
        AddWarrantyModalPageModule,
        EditWarrantyModalPageModule,
        ShippingManagementModalPageModule,
        AddShippingModalPageModule,
        EditShippingModalPageModule,
        VoucherManagementModalPageModule,
        AddVoucherModalPageModule,
        EditVoucherModalPageModule
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
        InventoryDetailsModalPage,
        AddStoreModalPage,
        EditStoreModalPage,
        PromotionManagementModalPage,
        AddPromotionModalPage,
        EditPromotionModalPage,
        WarrantyManagementModalPage,
        AddWarrantyModalPage,
        EditWarrantyModalPage,
        ShippingManagementModalPage,
        AddShippingModalPage,
        EditShippingModalPage,
        VoucherManagementModalPage,
        AddVoucherModalPage,
        EditVoucherModalPage
    ]
})

export class IpohDrumPageModule {
}
