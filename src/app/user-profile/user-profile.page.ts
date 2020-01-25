import {Component, NgZone, OnInit} from '@angular/core';
import {MenuController, NavController, Platform} from '@ionic/angular';
import {AuthenticationService} from '../_dal/common/services/authentication.service';
import {GlobalfunctionService} from '../_dal/common/services/globalfunction.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})

export class UserProfilePage implements OnInit {

  constructorName = '[' + this.constructor.name + ']';

  subscription: any;

  constructor(
      private platform: Platform,
      private ngZone: NgZone,
      private menuController: MenuController,
      private navController: NavController,
      private authenticationService: AuthenticationService,
      private globalFunctionService: GlobalfunctionService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.menuController.enable(true, 'userProfileSideBar');
    });
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      this.globalFunctionService.presentAlertConfirm(
          'WARNING',
          'Are you sure you want to exit the app?',
          'Cancel',
          'Exit',
          undefined,
          () => this.methodToExitApp()
      );
    });
  }

  methodToExitApp() {
    navigator['app'].exitApp();
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  closeSideMenu(page: number) {
    this.menuController.close('userProfileSideBar');
    switch (page) {
      case 0:
        this.navController.navigateRoot('/ipoh-drum/user-profile/my-profile');
        break;
      case 1:
        this.navController.navigateRoot('/ipoh-drum/user-profile/my-store');
        break;
      case 2:
        this.navController.navigateRoot('/ipoh-drum/user-profile/my-blog');
        break;
      case 3:
        this.navController.navigateRoot('/ipoh-drum/user-profile/my-channel');
        break;
      case 4:
        this.navController.navigateRoot('/ipoh-drum/user-profile/my-orders');
        break;
      case 5:
        this.navController.navigateRoot('/ipoh-drum/user-profile/my-statistics');
        break;
      case 6:
        this.logoutUser();
        break;
      case 7:
        this.navController.navigateRoot('login');
        break;
    }
  }

  logoutUser() {
    this.authenticationService.logoutUser();
    this.globalFunctionService.simpleToast('SUCCESS!', 'You have been logged out.', 'success');
    this.navController.navigateRoot('login');
  }

  isUserLoggedIn() {
    return this.authenticationService.isUserLoggedIn();
  }
}
