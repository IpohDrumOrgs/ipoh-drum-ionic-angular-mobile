import { Component, OnInit } from '@angular/core';
import {Pattern} from '../../../_dal/ipohdrum';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-view-inventory-pattern-modal',
  templateUrl: './view-inventory-pattern-modal.page.html',
  styleUrls: ['./view-inventory-pattern-modal.page.scss'],
})

export class ViewInventoryPatternModalPage implements OnInit {

  constructorName = '[' + this.constructor.name + ']';

  inventoryPatterns: Pattern;

  constructor(
      private modalController: ModalController
  ) {}

  ngOnInit() {
  }

  closeViewInventoryPatternModal() {
    this.modalController.dismiss();
  }
}
