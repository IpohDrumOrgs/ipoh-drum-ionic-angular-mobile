import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Blogger, BloggerControllerServiceService, Channel, ChannelControllerServiceService} from '../../../_dal/ipohdrum';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-view-channel-modal',
  templateUrl: './view-channel-modal.page.html',
  styleUrls: ['./view-channel-modal.page.scss'],
})

export class ViewChannelModalPage implements OnInit, OnDestroy {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  selectedChannelUid: string;

  // Booleans
  isLoadingChannelInfo = true;
  companyBelongingsFlag = false;

  // Objects
  selectedChannel: Channel;

  // Subscriptions
  getSelectedChannelByUidSubscription: any;

  constructor(
      private ref: ChangeDetectorRef,
      private ngZone: NgZone,
      private globalFunctionService: GlobalfunctionService,
      private channelControllerService: ChannelControllerServiceService,
      private modalController: ModalController
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {
      console.log('selected channel uid: ' + this.selectedChannelUid);
      this.retrieveSelectedChannelByUid();
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
      if (this.getSelectedChannelByUidSubscription) {
        this.getSelectedChannelByUidSubscription.unsubscribe();
      }
    });
  }

  retrieveSelectedChannelByUid() {
    console.log('retrieve chanel');
    this.isLoadingChannelInfo = true;
    if (this.getSelectedChannelByUidSubscription) {
      this.getSelectedChannelByUidSubscription.unsubscribe();
    }
    this.getSelectedChannelByUidSubscription = this.channelControllerService.getChannelByUid(
        this.selectedChannelUid
    ).subscribe(resp => {
      console.log(resp);
      if (resp.code === 200) {
        this.selectedChannel = resp.data;
        this.companyBelongingsFlag = resp.data.companyBelongings === 1;
      } else {
        this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve Channel info, please try again later!', 'danger');
        this.closeViewChannelModal();
      }
      this.isLoadingChannelInfo = false;
      this.ref.detectChanges();
    }, error => {
      console.log('API Error while retriving selected Channel by uid.');
      console.log(error);
      this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve Channel info, please try again later!', 'danger');
      this.closeViewChannelModal();
      this.isLoadingChannelInfo = false;
      this.ref.detectChanges();
    });
  }

  closeViewChannelModal() {
    this.modalController.dismiss();
  }
}
