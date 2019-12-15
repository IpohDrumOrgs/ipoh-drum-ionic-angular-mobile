import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {InventoryManagementModalPage} from '../inventory-management-modal/inventory-management-modal.page';
import {EditStoreModalPage} from '../edit-store-modal/edit-store-modal.page';
import {PromotionManagementModalPage} from '../promotion-management-modal/promotion-management-modal.page';

@Component({
  selector: 'app-store-inventory-management-modal',
  templateUrl: './store-inventory-management-modal.page.html',
  styleUrls: ['./store-inventory-management-modal.page.scss'],
})

export class StoreInventoryManagementModalPage implements OnInit {

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

  async closeStoreInventoryManagementModal() {
    await this.modalController.dismiss();
  }

  async openEditStoreModal() {
    const modal = await this.modalController.create({
      component: EditStoreModalPage,
      componentProps: {
        selectedStoreUid: this.selectedStoreUid
      }
    });
    return await modal.present();
  }

  async openInventoryManagementModal() {
    const modal = await this.modalController.create({
      component: InventoryManagementModalPage,
      componentProps: {
        selectedStoreUid: this.selectedStoreUid,
        selectedStoreId: this.selectedStoreId
      }
    });
    return await modal.present();
  }

  async openPromotionManagementModal() {
    const modal = await this.modalController.create({
      component: PromotionManagementModalPage,
      componentProps: {
        selectedStoreUid: this.selectedStoreUid,
        selectedStoreId: this.selectedStoreId
      }
    });
    return await modal.present();
  }
}
