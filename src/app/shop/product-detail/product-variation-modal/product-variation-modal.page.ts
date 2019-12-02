import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Inventory} from '../../../_dal/ipohdrum';
import {SharedService} from '../../../shared.service';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';
import {commonConfig} from '../../../_dal/common/commonConfig';

@Component({
  selector: 'app-product-variation-modal',
  templateUrl: './product-variation-modal.page.html',
  styleUrls: ['./product-variation-modal.page.scss'],
})

export class ProductVariationModalPage implements OnInit {

  constructorName = '[' + this.constructor.name + ']';

  selectedQuantity = 0;
  quantitiesToAdd = 1;
  nullSelectedInventoryPatternId = commonConfig.nullSelectedInventoryPatternId;

  addedInventoryToCart: any;
  availableInventoryPatterns: any;
  selectedInventory: Inventory;
  selectedInventoryFamily: any;
  selectedInventoryPattern: any;

  constructor(
      private modalController: ModalController,
      private sharedService: SharedService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  addQuantity() {
    if (this.selectedInventory.qty > this.quantitiesToAdd) {
      this.quantitiesToAdd++;
    }
  }

  reduceQuantity() {
    if (this.quantitiesToAdd > 1) {
      this.quantitiesToAdd--;
    }
  }

  selectInventoryFamily(inventoryFamily: any) {
    this.selectedInventoryFamily = inventoryFamily;
    if (inventoryFamily.patterns.length > 0) {
      this.availableInventoryPatterns = inventoryFamily.patterns;
    } else {
      this.availableInventoryPatterns = null;
      this.selectedInventoryPattern = null;
    }
  }

  selectInventoryPattern(patterns: any) {
    this.selectedInventoryPattern = patterns;
  }

  addItemToCart() {
    this.addedInventoryToCart = Object.assign({}, this.selectedInventory);
    this.addedInventoryToCart.selectedQuantity = 0;
    this.addedInventoryToCart.quantitiesToAdd = this.quantitiesToAdd;
    this.addedInventoryToCart.selectedInventoryFamily = this.selectedInventoryFamily;
    if (this.selectedInventoryPattern) {
      this.addedInventoryToCart.selectedInventoryPattern = this.selectedInventoryPattern;
    } else {
      this.addedInventoryToCart.selectedInventoryPattern = {
        id: this.nullSelectedInventoryPatternId
      };
    }
    console.log(this.addedInventoryToCart);
    this.sharedService.emitSelectedInventory(this.addedInventoryToCart);
    this.closeModal();
  }
}
