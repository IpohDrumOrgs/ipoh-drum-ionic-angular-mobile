import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {GlobalfunctionService} from '../_dal/common/services/globalfunction.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  currentTab = 'videos';

  // Booleans
  isShowingVideosTab = true;
  isShowingArticlesTab = false;
  isShowingMyVideosCollectionTab = false;
  subscription: any;

  constructor(
      public platform: Platform,
      private globalFunctionService: GlobalfunctionService
  ) {
  }

  /*ionViewDidEnter() {
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
  }*/

  ngOnInit() {
  }

  selectedTab(tab: string) {
    this.currentTab = tab;
    if (this.currentTab === 'videos') {
      this.isShowingVideosTab = true;
      this.isShowingArticlesTab = false;
      this.isShowingMyVideosCollectionTab = false;
    } else if (this.currentTab === 'articles') {
      this.isShowingVideosTab = false;
      this.isShowingArticlesTab = true;
      this.isShowingMyVideosCollectionTab = false;
    } else if (this.currentTab === 'my videos') {
      this.isShowingVideosTab = false;
      this.isShowingArticlesTab = false;
      this.isShowingMyVideosCollectionTab = true;
    }
  }
}
