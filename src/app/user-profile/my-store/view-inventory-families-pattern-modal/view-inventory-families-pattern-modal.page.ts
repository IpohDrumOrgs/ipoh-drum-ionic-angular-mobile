import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ViewInventoryPatternModalPage} from '../view-inventory-pattern-modal/view-inventory-pattern-modal.page';
import {InventoryFamily, Pattern} from '../../../_dal/ipohdrum';

@Component({
  selector: 'app-view-inventory-families-pattern-modal',
  templateUrl: './view-inventory-families-pattern-modal.page.html',
  styleUrls: ['./view-inventory-families-pattern-modal.page.scss'],
})

export class ViewInventoryFamiliesPatternModalPage implements OnInit {

  constructorName = '[' + this.constructor.name + ']';

  invFamilyPattern: InventoryFamily;

  constructor(
      private modalController: ModalController
  ) {}

  ngOnInit() {
  }

  closeViewInventoryFamiliesAndPatternModal() {
    this.modalController.dismiss();
  }

  async openViewInventoryPatternModal(inventoryPattern: Pattern) {
    const modal = await this.modalController.create({
      component: ViewInventoryPatternModalPage,
      cssClass: 'inv-pattern-modal',
      componentProps: {
        inventoryPatterns: inventoryPattern
      }
    });
    return await modal.present();
  }
}
