import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { CategoryControllerServiceService } from './api/categoryControllerService.service';
import { CompanyControllerServiceService } from './api/companyControllerService.service';
import { CompanyTypeControllerServiceService } from './api/companyTypeControllerService.service';
import { GroupControllerServiceService } from './api/groupControllerService.service';
import { InventoryControllerServiceService } from './api/inventoryControllerService.service';
import { ModuleControllerServiceService } from './api/moduleControllerService.service';
import { ProductFeatureControllerServiceService } from './api/productFeatureControllerService.service';
import { ProductPromotionControllerServiceService } from './api/productPromotionControllerService.service';
import { ProductReviewControllerServiceService } from './api/productReviewControllerService.service';
import { RoleControllerServiceService } from './api/roleControllerService.service';
import { SaleControllerServiceService } from './api/saleControllerService.service';
import { ShippingControllerServiceService } from './api/shippingControllerService.service';
import { StoreControllerServiceService } from './api/storeControllerService.service';
import { StoreReviewControllerServiceService } from './api/storeReviewControllerService.service';
import { TicketControllerServiceService } from './api/ticketControllerService.service';
import { TypeControllerServiceService } from './api/typeControllerService.service';
import { UserControllerServiceService } from './api/userControllerService.service';
import { VerificationCodeControllerServiceService } from './api/verificationCodeControllerService.service';
import { VoucherControllerServiceService } from './api/voucherControllerService.service';
import { WarrantyControllerServiceService } from './api/warrantyControllerService.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    CategoryControllerServiceService,
    CompanyControllerServiceService,
    CompanyTypeControllerServiceService,
    GroupControllerServiceService,
    InventoryControllerServiceService,
    ModuleControllerServiceService,
    ProductFeatureControllerServiceService,
    ProductPromotionControllerServiceService,
    ProductReviewControllerServiceService,
    RoleControllerServiceService,
    SaleControllerServiceService,
    ShippingControllerServiceService,
    StoreControllerServiceService,
    StoreReviewControllerServiceService,
    TicketControllerServiceService,
    TypeControllerServiceService,
    UserControllerServiceService,
    VerificationCodeControllerServiceService,
    VoucherControllerServiceService,
    WarrantyControllerServiceService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
