import { Component, OnInit, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './_dal/common/services/authentication.service';
import { Router } from '@angular/router';
import { GlobalfunctionService } from './_dal/common/services/globalfunction.service';
import {UserControllerServiceService} from './_dal/ipohdrum';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ngZone: NgZone,
    private authenticationService: AuthenticationService,
    private router: Router,
    private globalFunctionService: GlobalfunctionService,
    private userControllerService: UserControllerServiceService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.router.navigate(['/ipoh-drum/home']);
    this.ngZone.run(() => {
      // if (this.authenticationService.isUserLoggedIn()) {
      //   this.globalFunctionService.simpleToast(undefined, 'You are logged in!', 'primary');
      // } else {
      //   this.globalFunctionService.simpleToast('ERROR!', 'You are not authenticated, please login first!', 'danger');
      //   this.router.navigate(['/ipoh-drum/login']);
      // }
    });
    // this.ngZone.run(() => {
    //   this.authenticationService.authenticate().then(resp => {
    //     if (resp.status) {
    //       if (resp.status === 200) {
    //         console.log('Authenticated');
    //         this.globalFunctionService.simpleToast(undefined, 'You are logged in!', 'primary');
    //         this.router.navigate(['/shop']);
    //       }
    //     } else {
    //       if (resp.name === 'Error') {
    //         console.log('Unauthorized');
    //         this.globalFunctionService.simpleToast('ERROR!', 'You are not authenticated, please login first!', 'danger');
    //         this.router.navigate(['/login']);
    //       }
    //     }
    //   }, error => {
    //     console.log('front-end authenticate api error');
    //     this.globalFunctionService.simpleToast('ERROR!', this.apiErrorMessage, 'danger');
    //     this.router.navigate(['/**']);
    //   });
    // });
  }
}
