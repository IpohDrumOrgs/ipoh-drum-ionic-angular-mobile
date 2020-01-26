import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Platform} from '@ionic/angular';
import {GlobalfunctionService} from '../_dal/common/services/globalfunction.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_dal/common/services/authentication.service';

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

  // ViewChilds
  @ViewChild('videosTab', {static: false}) videosTab: ElementRef<HTMLElement>;

  // Subscriptions
  subscription: any;

  constructor(
      private router: Router,
      public platform: Platform,
      private authenticationService: AuthenticationService,
      private globalFunctionService: GlobalfunctionService
  ) {
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
      if (this.checkIfUserIsLoggedIn()) {
        this.isShowingVideosTab = false;
        this.isShowingArticlesTab = false;
        this.isShowingMyVideosCollectionTab = true;
      } else {
        this.globalFunctionService.presentAlertConfirm(
            'WARNING',
            'You need to be logged in to access My Video collections.',
            'Cancel',
            'Login',
            () => this.cancelNotToLogin(),
            () => this.actuallyNavigateToLoginScreen()
        );
      }
    }
  }

  clickedHomeSearchbar() {
    this.router.navigate(['ipoh-drum/search']).catch(reason => {
      this.globalFunctionService.simpleToast('ERROR', 'Something went wrong, please try again later!', 'danger');
    });
  }

  checkIfUserIsLoggedIn() {
    return this.authenticationService.isUserLoggedIn();
  }

  promptUserToLogin() {
    this.globalFunctionService.presentAlertConfirm(
        'WARNING',
        'You need to be logged in to access your Video collections.',
        'Cancel',
        'Login',
        undefined,
        () => this.actuallyNavigateToLoginScreen()
    );
  }

  cancelNotToLogin() {
    const el: HTMLElement = this.videosTab.nativeElement;
    el.click();
  }

  actuallyNavigateToLoginScreen() {
    const el: HTMLElement = this.videosTab.nativeElement;
    el.click();
    this.router.navigate(['login']).catch(reason => {
      this.globalFunctionService.simpleToast('ERROR', 'Something went wrong, please try again later!', 'danger');
    });
  }
}
