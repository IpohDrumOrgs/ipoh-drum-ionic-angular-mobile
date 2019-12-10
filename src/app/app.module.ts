import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LaravelPassportModule} from 'laravel-passport';
import {UserControllerServiceService} from './_dal/ipohdrum';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthzInterceptor} from './_dal/common/services/authz-interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './_dal/common/services/authentication.service';
import {IonicStorageModule} from '@ionic/storage';
import {SharedModule} from './shared/shared.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {LoadingService} from './_dal/common/services/loading.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductVariationModalPageModule} from './shop/product-detail/product-variation-modal/product-variation-modal.module';
import {SharedService} from './shared.service';
import { NgSelect2Module } from 'ng-select2';
import { FormWizardModule } from 'angular-wizard-form';
// tslint:disable-next-line:max-line-length
import {InvFamilyPatternModalPageModule} from './user-profile/my-store/add-inventory/inv-family-pattern-modal/inv-family-pattern-modal.module';
// tslint:disable-next-line:max-line-length
import {AddInventoryPatternModalPageModule} from './user-profile/my-store/add-inventory/inv-family-pattern-modal/add-inventory-pattern-modal/add-inventory-pattern-modal.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        AppComponent,
    ],
    entryComponents: [],
    imports: [
        NgbModule,
        BrowserModule,
        IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        AppRoutingModule,
        IonicStorageModule.forRoot(),
        LaravelPassportModule.forRoot(
            {apiRoot: 'http://localhost:8000', clientId: 2, clientSecret: 'RwUlcoyqwDmwcnBKshraeEAXwdM2kxoVWbeJbZZB'}
        ),
        PerfectScrollbarModule,
        ProductVariationModalPageModule,
        NgSelect2Module,
        FormWizardModule,
        InvFamilyPatternModalPageModule,
        AddInventoryPatternModalPageModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        UserControllerServiceService,
        AuthenticationService,
        LoadingService,
        SharedService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthzInterceptor,
            multi: true
        },
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
