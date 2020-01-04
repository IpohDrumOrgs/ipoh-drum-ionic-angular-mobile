import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ViewChannelModalPage} from '../view-channel-modal/view-channel-modal.page';
import {VideoManagementModalPage} from '../video-management-modal/video-management-modal.page';

@Component({
  selector: 'app-main-channel-management-modal',
  templateUrl: './main-channel-management-modal.page.html',
  styleUrls: ['./main-channel-management-modal.page.scss'],
})

export class MainChannelManagementModalPage implements OnInit {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  selectedChannelUid: string;

  // Numbers
  selectedChannelId: number;

  constructor(
      private modalController: ModalController
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
  }

  async openViewSelectedChannelModal() {
    const modal = await this.modalController.create({
      component: ViewChannelModalPage,
      componentProps: {
        selectedChannelUid: this.selectedChannelUid
      }
    });
    return await modal.present();
  }

  async openVideoManagementModal() {
    const modal = await this.modalController.create({
      component: VideoManagementModalPage,
      componentProps: {
        selectedChannelUid: this.selectedChannelUid,
        selectedChannelId: this.selectedChannelId
      }
    });
    return await modal.present();
  }
}
