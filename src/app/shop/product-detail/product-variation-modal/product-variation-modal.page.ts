import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Inventory} from '../../../_dal/ipohdrum';
import {SharedService} from '../../../shared.service';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';

@Component({
  selector: 'app-product-variation-modal',
  templateUrl: './product-variation-modal.page.html',
  styleUrls: ['./product-variation-modal.page.scss'],
})

export class ProductVariationModalPage implements OnInit {

  constructorName = '[' + this.constructor.name + ']';

  selectedInventory: Inventory;

  selectedQuantity = 1;

  constructor(
      private modalController: ModalController,
      private sharedService: SharedService,
      private globalFunctionService: GlobalfunctionService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  addQuantity() {
    if (this.selectedInventory.qty > this.selectedQuantity) {
      this.selectedQuantity++;
    }
  }

  reduceQuantity() {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  addItemToCart() {
    this.sharedService.emitSelectedInventory(this.selectedInventory);
    this.globalFunctionService.simpleToast(null, 'Item has been added to your cart!', 'success', 'bottom');
    this.closeModal();
  }
}
