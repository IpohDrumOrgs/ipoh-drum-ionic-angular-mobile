import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Inventory} from '../../../_dal/ipohdrum';

@Component({
  selector: 'app-product-variation-modal',
  templateUrl: './product-variation-modal.page.html',
  styleUrls: ['./product-variation-modal.page.scss'],
})
export class ProductVariationModalPage implements OnInit {

  selectedInventory: Inventory;

  selectedQuantity = 1;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log('passed into modal inventory:');
    console.log(this.selectedInventory);
  }

  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
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
}
