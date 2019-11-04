import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LaravelPassportModule } from 'laravel-passport';
import { UserControllerServiceService } from './_dal/ipohdrum';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthzInterceptor } from './_dal/common/services/authz-interceptor';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShopComponent } from './shop/shop.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileDetailsComponent } from './user-profile/user-profile-details/user-profile-details.component';
import { MyVideosComponent } from './user-profile/my-videos/my-videos.component';
import { MyStoreComponent } from './user-profile/my-store/my-store.component';
import { MyOrdersComponent } from './user-profile/my-orders/my-orders.component';
import { MyStatisticsComponent } from './user-profile/my-statistics/my-statistics.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './_dal/common/services/authentication.service';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    ShoppingCartComponent,
    UserProfileComponent,
    UserProfileDetailsComponent,
    MyVideosComponent,
    MyStoreComponent,
    MyOrdersComponent,
    MyStatisticsComponent,
    LoginComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    LaravelPassportModule.forRoot(
      {apiRoot : 'http://localhost:8000', clientId : 2, clientSecret : 'IaZUzWgbQ0GACSBjzUz2xNgdEWDOVWB0pRZkMg1K'}
    )
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserControllerServiceService,
    AuthenticationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthzInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
