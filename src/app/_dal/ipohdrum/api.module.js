"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var configuration_1 = require("./configuration");
var categoryControllerService_service_1 = require("./api/categoryControllerService.service");
var companyControllerService_service_1 = require("./api/companyControllerService.service");
var companyTypeControllerService_service_1 = require("./api/companyTypeControllerService.service");
var groupControllerService_service_1 = require("./api/groupControllerService.service");
var inventoryControllerService_service_1 = require("./api/inventoryControllerService.service");
var moduleControllerService_service_1 = require("./api/moduleControllerService.service");
var productFeatureControllerService_service_1 = require("./api/productFeatureControllerService.service");
var productPromotionControllerService_service_1 = require("./api/productPromotionControllerService.service");
var productReviewControllerService_service_1 = require("./api/productReviewControllerService.service");
var roleControllerService_service_1 = require("./api/roleControllerService.service");
var saleControllerService_service_1 = require("./api/saleControllerService.service");
var shippingControllerService_service_1 = require("./api/shippingControllerService.service");
var storeControllerService_service_1 = require("./api/storeControllerService.service");
var ticketControllerService_service_1 = require("./api/ticketControllerService.service");
var typeControllerService_service_1 = require("./api/typeControllerService.service");
var userControllerService_service_1 = require("./api/userControllerService.service");
var verificationCodeControllerService_service_1 = require("./api/verificationCodeControllerService.service");
var warrantyControllerService_service_1 = require("./api/warrantyControllerService.service");
var ApiModule = /** @class */ (function () {
    function ApiModule(parentModule, http) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
    ApiModule_1 = ApiModule;
    ApiModule.forRoot = function (configurationFactory) {
        return {
            ngModule: ApiModule_1,
            providers: [{ provide: configuration_1.Configuration, useFactory: configurationFactory }]
        };
    };
    var ApiModule_1;
    ApiModule = ApiModule_1 = __decorate([
        core_1.NgModule({
            imports: [],
            declarations: [],
            exports: [],
            providers: [
                categoryControllerService_service_1.CategoryControllerServiceService,
                companyControllerService_service_1.CompanyControllerServiceService,
                companyTypeControllerService_service_1.CompanyTypeControllerServiceService,
                groupControllerService_service_1.GroupControllerServiceService,
                inventoryControllerService_service_1.InventoryControllerServiceService,
                moduleControllerService_service_1.ModuleControllerServiceService,
                productFeatureControllerService_service_1.ProductFeatureControllerServiceService,
                productPromotionControllerService_service_1.ProductPromotionControllerServiceService,
                productReviewControllerService_service_1.ProductReviewControllerServiceService,
                roleControllerService_service_1.RoleControllerServiceService,
                saleControllerService_service_1.SaleControllerServiceService,
                shippingControllerService_service_1.ShippingControllerServiceService,
                storeControllerService_service_1.StoreControllerServiceService,
                ticketControllerService_service_1.TicketControllerServiceService,
                typeControllerService_service_1.TypeControllerServiceService,
                userControllerService_service_1.UserControllerServiceService,
                verificationCodeControllerService_service_1.VerificationCodeControllerServiceService,
                warrantyControllerService_service_1.WarrantyControllerServiceService
            ]
        }),
        __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
        __param(1, core_1.Optional())
    ], ApiModule);
    return ApiModule;
}());
exports.ApiModule = ApiModule;
