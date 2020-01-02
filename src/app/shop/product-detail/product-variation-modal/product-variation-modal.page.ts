import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SharedService} from '../../../shared.service';
import {commonConfig} from '../../../_dal/common/commonConfig';

@Component({
  selector: 'app-product-variation-modal',
  templateUrl: './product-variation-modal.page.html',
  styleUrls: ['./product-variation-modal.page.scss'],
})

export class ProductVariationModalPage implements OnInit {

  constructorName = '[' + this.constructor.name + ']';

  quantitiesToAdd = 1;
  nullSelectedInventoryPatternId = commonConfig.nullSelectedInventoryPatternId;

  availableInventoryPatterns: any;
  selectedInventory: any;
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

  closeModal() {
    this.modalController.dismiss();
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
    console.log(inventoryFamily);
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
    this.selectedInventory.quantitiesToAdd = this.quantitiesToAdd;

    this.selectedInventory.selectedInventoryFamily = this.selectedInventoryFamily;

    if (this.selectedInventoryPattern) {
      this.selectedInventory.selectedInventoryPattern = this.selectedInventoryPattern;
    } else {
      this.selectedInventory.selectedInventoryPattern = {
        id: this.nullSelectedInventoryPatternId
      };
    }

    this.sharedService.emitSelectedInventory(this.selectedInventory);
    this.closeModal();
  }
}
