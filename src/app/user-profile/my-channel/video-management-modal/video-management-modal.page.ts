import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ChannelControllerServiceService, Video} from '../../../_dal/ipohdrum';
import {ModalController} from '@ionic/angular';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';
import {LoadingService} from '../../../_dal/common/services/loading.service';

@Component({
  selector: 'app-video-management-modal',
  templateUrl: './video-management-modal.page.html',
  styleUrls: ['./video-management-modal.page.scss'],
})

export class VideoManagementModalPage implements OnInit, OnDestroy {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  selectedChannelUid: string;

  // Numbers
  selectedChannelId: number;
  currentPageNumber = 1;
  currentPageSize = 10;
  maximumPages: number;
  totalResult: number;

  // Arrays
  listOfVideosByChannelUid: Array<Video> = [];

  // Objects
  referInfiniteScroll: any;

  // Subscriptions
  getListOfVideosByChannelUidSubscription: any;
  appendListOfVideosByChannelUidSubscription: any;

  constructor(
      private ref: ChangeDetectorRef,
      private ngZone: NgZone,
      private modalController: ModalController,
      private globalFunctionService: GlobalfunctionService,
      private loadingService: LoadingService,
      private channelControllerService: ChannelControllerServiceService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.retrieveListOfVideosByChannelUid();
    });
  }

  ngOnDestroy() {
    this.unsubscribeSubscriptions();
  }

  ionViewDidLeave() {
    this.unsubscribeSubscriptions();
  }

  unsubscribeSubscriptions() {
    this.ngZone.run(() => {
      if (this.getListOfVideosByChannelUidSubscription) {
        this.getListOfVideosByChannelUidSubscription.unsubscribe();
      }
    });
  }

  closeVideoManagementModal() {
    this.modalController.dismiss();
  }

  retrieveListOfVideosByChannelUid() {
    this.loadingService.present();
    if (this.getListOfVideosByChannelUidSubscription) {
      this.getListOfVideosByChannelUidSubscription.unsubscribe();
    }
/*    this.getListOfVideosByChannelUidSubscription = this.channelControllerService.getVideosByChannelUid(
        this.selectedBloggerUid,
        this.currentPageNumber,
        this.currentPageSize
    ).subscribe(resp => {
      console.log(resp);
      if (resp.code === 200) {
        this.listOfArticlesByBloggerUid = resp.data;
        this.maximumPages = resp.maximumPages;
        this.totalResult = resp.totalResult;
      } else {
        this.listOfArticlesByBloggerUid = [];
        this.maximumPages = 0;
        this.totalResult = 0;
        // tslint:disable-next-line:max-line-length
        this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve list of Articles, please try again later!', 'warning', 'top');
        this.closeArticleManagementModal();
      }
      this.loadingService.dismiss();
      this.ref.detectChanges();
    }, error => {
      console.log('API Error while retrieving list of Articles by Blogger Uid.');
      console.log(error);
      this.loadingService.dismiss();
      // tslint:disable-next-line:max-line-length
      this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve list of Articles, please try again later!', 'warning', 'top');
      this.closeArticleManagementModal();
      this.ref.detectChanges();
    });*/
  }
}
