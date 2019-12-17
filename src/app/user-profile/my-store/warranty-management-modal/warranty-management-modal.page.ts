import { Component, OnInit } from '@angular/core';
import {AddPromotionModalPage} from '../promotion-management-modal/add-promotion-modal/add-promotion-modal.page';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-warranty-management-modal',
  templateUrl: './warranty-management-modal.page.html',
  styleUrls: ['./warranty-management-modal.page.scss'],
})

export class WarrantyManagementModalPage implements OnInit {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  selectedStoreUid: string;

  // Numbers
  selectedStoreId: number;

  constructor(
      private modalController: ModalController
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
  }

  async closeWarrantyManagementModal() {
    await this.modalController.dismiss();
  }

  async openCreatePromotionPlanModal() {
    const modal = await this.modalController.create({
      component: AddPromotionModalPage,
      componentProps: {
        selectedStoreUid: this.selectedStoreUid,
        selectedStoreId: this.selectedStoreId
      }
    });
    return await modal.present();
  }
}
