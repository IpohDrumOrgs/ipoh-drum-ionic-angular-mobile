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
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {LoadingService} from './_dal/common/services/loading.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedService} from './shared.service';
import {IpohDrumPageModule} from './ipoh-drum/ipoh-drum.module';
import {ProductVariationModalPageModule} from './shop/product-detail/product-variation-modal/product-variation-modal.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        NgbModule,
        BrowserModule,
        IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        IonicStorageModule.forRoot(),
        LaravelPassportModule.forRoot(
            {apiRoot: 'http://localhost:8000', clientId: 2, clientSecret: 'hbWXwc0pEdwoPRvqsA9J45enb8P6tRtnviVTWtmo'}
        ),
        PerfectScrollbarModule,
        IpohDrumPageModule
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
