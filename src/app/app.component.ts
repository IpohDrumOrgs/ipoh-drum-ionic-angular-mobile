import { Component, OnInit, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserControllerServiceService } from './_dal/ipohdrum';
import { User } from './_dal/ipohdrum/model/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {

  listOfUsers: User[] = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ngZone: NgZone,
    private userControllerServicesService: UserControllerServiceService
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
    this.ngZone.run(() => {
      console.log('Getting list of users.');
      this.userControllerServicesService.getUserList().subscribe(resp => {
        console.log(resp);
      });
    });
  }
}
