import {Component, NgZone, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})

export class UserProfilePage implements OnInit {

  constructorName = '[' + this.constructor.name + ']';

  constructor(
      private ngZone: NgZone,
      private menuController: MenuController,
      private navController: NavController
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.menuController.enable(true, 'userProfileSideBar');
    });
  }

  closeSideMenu(page: number) {
    this.menuController.close('userProfileSideBar');
    switch (page) {
      case 0:
        this.navController.navigateRoot('/ipoh-drum/user-profile/my-profile');
        break;
      case 1:
        this.navController.navigateRoot('/ipoh-drum/user-profile/my-videos');
        break;
      case 2:
        this.navController.navigateRoot('/ipoh-drum/user-profile/my-store');
        break;
      case 3:
        this.navController.navigateRoot('/ipoh-drum/user-profile/my-orders');
        break;
      case 4:
        this.navController.navigateRoot('/ipoh-drum/user-profile/my-statistics');
        break;
    }
  }
}
