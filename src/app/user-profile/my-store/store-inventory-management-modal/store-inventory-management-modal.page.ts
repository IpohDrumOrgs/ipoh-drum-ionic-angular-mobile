import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Store} from '../../../_dal/ipohdrum';
import {AddInventoryPage} from '../add-inventory/add-inventory.page';
import {InventoryManagementModalPage} from '../inventory-management-modal/inventory-management-modal.page';

@Component({
  selector: 'app-store-inventory-management-modal',
  templateUrl: './store-inventory-management-modal.page.html',
  styleUrls: ['./store-inventory-management-modal.page.scss'],
})

export class StoreInventoryManagementModalPage implements OnInit {

  // Strings
  constructorName = '[' + this.constructor.name + ']';

  // Objects
  selectedStore: Store;

  constructor(
      private modalController: ModalController
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
  }

  closeStoreInventoryManagementModal() {
    this.modalController.dismiss();
  }

  async openInventoryManagementModal() {
    const modal = await this.modalController.create({
      component: InventoryManagementModalPage,
      componentProps: {
        selectedStore: this.selectedStore
      }
    });
    return await modal.present();
  }
}
