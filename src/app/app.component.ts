import { Component, OnInit, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './_dal/ipohdrum/model/user';
import { AuthenticationService } from './_dal/common/services/authentication.service';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { GlobalfunctionService } from './_dal/common/services/globalfunction.service';
import { UserControllerServiceService } from './_dal/ipohdrum';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {

  listOfUsers: User[] = [];

  isLoginPage = false;

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
    this.router.events.subscribe((event) => {
      // // From which url
      // if (event instanceof NavigationStart) {
      //     // Show loading indicator
      // }
      // To which url
      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          if (this.router.url === '/login') {
            this.isLoginPage = true;
          } else {
            this.isLoginPage = false;
          }
      }
      // if (event instanceof NavigationError) {
      //     // Hide loading indicator
      //     console.log('navigate error');
      // }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.ngZone.run(() => {
      if (this.authenticationService.isUserLoggedIn()) {
        this.globalFunctionService.simpleToast(undefined, 'You are logged in!', 'primary');
      } else {
        this.globalFunctionService.simpleToast('Error!', 'You are not authenticated, please login first!', 'danger');
        this.router.navigate(['/login']);
      }
    });
  }
}
