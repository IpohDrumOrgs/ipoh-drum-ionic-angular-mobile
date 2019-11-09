import { Component, OnInit, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './_dal/ipohdrum/model/user';
import { AuthenticationService } from './_dal/common/services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { GlobalfunctionService } from './_dal/common/services/globalfunction.service';

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
    private globalFunctionService: GlobalfunctionService
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
          this.isLoginPage = this.router.url === '/login';
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
    //         this.globalFunctionService.simpleToast('Error!', 'You are not authenticated, please login first!', 'danger');
    //         this.router.navigate(['/login']);
    //       }
    //     }
    //   }, error => {
    //     console.log('front-end authenticate api error');
    //     this.globalFunctionService.simpleToast('Error!', 'Something went wrong, please refresh the page or try again later!', 'danger');
    //     this.router.navigate(['/**']);
    //   });
    // });
  }
}
