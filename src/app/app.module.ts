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

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    ShoppingCartComponent,
    UserProfileComponent,
    UserProfileDetailsComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    LaravelPassportModule.forRoot(
      {apiRoot : 'http://localhost:8000', clientId : 2, clientSecret : 'IaZUzWgbQ0GACSBjzUz2xNgdEWDOVWB0pRZkMg1K'}
    )
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserControllerServiceService,
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
