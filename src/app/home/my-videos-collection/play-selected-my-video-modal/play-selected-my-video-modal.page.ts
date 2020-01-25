import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Video, VideoControllerServiceService} from '../../../_dal/ipohdrum';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-play-selected-my-video-modal',
  templateUrl: './play-selected-my-video-modal.page.html',
  styleUrls: ['./play-selected-my-video-modal.page.scss'],
})
export class PlaySelectedMyVideoModalPage implements OnInit, OnDestroy {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  myVideoUid: string;
  videoUrl: string;

  // Booleans
  isLoadingSelectedMyVideo = true;

  // Objects
  selectedMyVideo: Video;

  // Subscriptions
  getMyVideoByUidSubscription: any;

  constructor(
      private ngZone: NgZone,
      private modalController: ModalController,
      private globalFunctionService: GlobalfunctionService,
      private videoControllerService: VideoControllerServiceService
  ) {}

  ngOnInit() {
    this.ngZone.run(() => {
        this.retrieveSelectedMyVideoByUid();
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
      if (this.getMyVideoByUidSubscription) {
        this.getMyVideoByUidSubscription.unsubscribe();
      }
    });
  }

  retrieveSelectedMyVideoByUid() {
    this.isLoadingSelectedMyVideo = true;
    if (this.getMyVideoByUidSubscription) {
      this.getMyVideoByUidSubscription.unsubscribe();
    }
    this.getMyVideoByUidSubscription = this.videoControllerService.getPublicVideoByUid(
        this.myVideoUid
    ).subscribe(resp => {
      if (resp.code === 200) {
        this.selectedMyVideo = resp.data;
        this.videoUrl = this.selectedMyVideo.videopath;
      } else {
        this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve the selected Video, please try again later!', 'danger');
        this.closePlaySelectedMyVideoModal();
      }
      this.isLoadingSelectedMyVideo = false;
    }, error => {
      this.isLoadingSelectedMyVideo = false;
      this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve the selected Video, please try again later!', 'danger');
      this.closePlaySelectedMyVideoModal();
    });
  }

  closePlaySelectedMyVideoModal() {
    this.modalController.dismiss();
  }
}
