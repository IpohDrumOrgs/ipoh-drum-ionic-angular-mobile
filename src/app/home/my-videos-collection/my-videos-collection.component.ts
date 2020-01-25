import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {commonConfig} from '../../_dal/common/commonConfig';
import {VideoControllerServiceService} from '../../_dal/ipohdrum';
import {LoadingService} from '../../_dal/common/services/loading.service';
import {GlobalfunctionService} from '../../_dal/common/services/globalfunction.service';
import {ModalController} from '@ionic/angular';
import {PlaySelectedMyVideoModalPage} from './play-selected-my-video-modal/play-selected-my-video-modal.page';

@Component({
  selector: 'app-my-videos-collection',
  templateUrl: './my-videos-collection.component.html',
  styleUrls: ['./my-videos-collection.component.scss'],
})

export class MyVideosCollectionComponent implements OnInit, OnDestroy {

  // Strings
  constructorName = '[' + this.constructor.name + ']';

  // Numbers
  currentPageNumber = 1;
  currentPageSize = commonConfig.currentPageSize;
  maximumPages: number;
  totalResult: number;

  // Booleans
  isLoadingMyVideosCollection = true;
  playSelectedMyVideoModalOpen = false;

  // Arrays
  listOfMyVideosCollection: Array<any> = [];

  // Objects
  referInfiniteScroll: any;

  // Subscription
  getListOfMyVideosCollectionSubscription: any;
  appendListOfMyVideosCollectionSubscription: any;

  constructor(
      private ngZone: NgZone,
      private loadingService: LoadingService,
      private modalController: ModalController,
      private globalFunctionService: GlobalfunctionService,
      private videoControllerService: VideoControllerServiceService
  ) {}

  ngOnInit() {
    this.ngZone.run(() => {
      this.retrieveListOfMyVideosCollection();
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
      if (this.getListOfMyVideosCollectionSubscription) {
        this.getListOfMyVideosCollectionSubscription.unsubscribe();
      }
      if (this.appendListOfMyVideosCollectionSubscription) {
        this.appendListOfMyVideosCollectionSubscription.unsubscribe();
      }
    });
  }

  retrieveListOfMyVideosCollection() {
    this.loadingService.present();
    this.isLoadingMyVideosCollection = true;
    if (this.getListOfMyVideosCollectionSubscription) {
      this.getListOfMyVideosCollectionSubscription.unsubscribe();
    }
    this.currentPageNumber = 1;
    this.getListOfMyVideosCollectionSubscription = this.videoControllerService.getUserVideos(
        this.currentPageNumber,
        this.currentPageSize
    ).subscribe(resp => {
      console.log(resp);
      if (resp.code === 200) {
        this.listOfMyVideosCollection = resp.data;
        this.maximumPages = resp.maximumPages;
        this.totalResult = resp.totalResult;
      } else {
        console.log('error response code');
        this.listOfMyVideosCollection = [];
        this.maximumPages = 0;
        this.totalResult = 0;
        // tslint:disable-next-line:max-line-length
        this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve My Videos collection, please try again later!', 'warning', 'top');
      }
      this.loadingService.dismiss();
      this.isLoadingMyVideosCollection = false;
    }, error => {
      console.log('api error');
      // tslint:disable-next-line:max-line-length
      this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve My Videos collection, please try again later!', 'warning', 'top');
      this.listOfMyVideosCollection = [];
      this.maximumPages = 0;
      this.totalResult = 0;
      this.loadingService.dismiss();
      this.isLoadingMyVideosCollection = false;
    });
  }

  async openModalToPlaySelectedMyVideo(myVideoUid: string) {
    if (!this.playSelectedMyVideoModalOpen) {
      this.playSelectedMyVideoModalOpen = true;
      const modal = await this.modalController.create({
        component: PlaySelectedMyVideoModalPage,
        componentProps: {
          myVideoUid
        }
      });
      modal.onDidDismiss().then(() => {
        this.playSelectedMyVideoModalOpen = false;
      });
      return await modal.present();
    }
  }

  ionRefresh(event) {
    if (this.referInfiniteScroll) {
      this.referInfiniteScroll.target.disabled = false;
    }
    if (this.getListOfMyVideosCollectionSubscription) {
      this.getListOfMyVideosCollectionSubscription.unsubscribe();
    }
    this.currentPageNumber = 1;
    this.getListOfMyVideosCollectionSubscription = this.videoControllerService.getUserVideos(
        this.currentPageNumber,
        this.currentPageSize
    ).subscribe(resp => {
      if (resp.code === 200) {
        this.listOfMyVideosCollection = resp.data;
        this.maximumPages = resp.maximumPages;
        this.totalResult = resp.totalResult;
      } else {
        this.listOfMyVideosCollection = [];
        this.maximumPages = 0;
        this.totalResult = 0;
        // tslint:disable-next-line:max-line-length
        this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve My Videos collection, please try again later!', 'warning', 'top');
      }
      event.target.complete();
    }, error => {
      // tslint:disable-next-line:max-line-length
      this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve My Videos collection, please try again later!', 'warning', 'top');
      this.listOfMyVideosCollection = [];
      this.maximumPages = 0;
      this.totalResult = 0;
      event.target.complete();
    });
  }

  loadMoreVideos(event) {
    this.referInfiniteScroll = event;
    setTimeout(() => {
      if (this.maximumPages > this.currentPageNumber) {
        this.currentPageNumber++;
        this.appendListOfMyVideosCollectionSubscription = this.videoControllerService.getUserVideos(
            this.currentPageNumber,
            this.currentPageSize
        ).subscribe(resp => {
          if (resp.code === 200) {
            for (const tempMyVideos of resp.data) {
              this.listOfMyVideosCollection.push(tempMyVideos);
            }
          }
          this.referInfiniteScroll.target.complete();
        }, error => {
          this.referInfiniteScroll.target.complete();
        });
      }
      if (this.totalResult === this.listOfMyVideosCollection.length) {
        this.referInfiniteScroll.target.disabled = true;
      }
    }, 500);
  }
}
