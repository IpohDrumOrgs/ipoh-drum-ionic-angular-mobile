import {Component, NgZone, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {InventoryFamily, Pattern} from '../../../_dal/ipohdrum';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';
// tslint:disable-next-line:max-line-length
import {AddInventoryPatternModalPage} from '../add-inventory/inv-family-pattern-modal/add-inventory-pattern-modal/add-inventory-pattern-modal.page';

@Component({
  selector: 'app-edit-inventory-families-and-patterns',
  templateUrl: './edit-inventory-families-and-patterns.page.html',
  styleUrls: ['./edit-inventory-families-and-patterns.page.scss'],
})

export class EditInventoryFamiliesAndPatternsPage implements OnInit {

  // Strings
  constructorName = '[' + this.constructor.name + ']';

  // Arrays
  inventoryFamiliesAndPatternsToEdit: InventoryFamily;
  referenceInventoryFamiliesAndPatternsToEdit: InventoryFamily;
  tempInventoryPatternsToInsert: Array<Pattern> = [];

  constructor(
      private ngZone: NgZone,
      private modalController: ModalController,
      private globalFunctionService: GlobalfunctionService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.referenceInventoryFamiliesAndPatternsToEdit = Object.assign({}, this.inventoryFamiliesAndPatternsToEdit);
      this.tempInventoryPatternsToInsert = Object.assign([], this.inventoryFamiliesAndPatternsToEdit.patterns);
    });
  }

  closeEditInventoryFamiliesAndPatternsModal() {
    this.modalController.dismiss();
  }

  closeAndPassEditedInventoryFamiliesAndPatternModal() {
    this.referenceInventoryFamiliesAndPatternsToEdit.patterns = Object.assign([], this.tempInventoryPatternsToInsert);
    this.modalController.dismiss(this.referenceInventoryFamiliesAndPatternsToEdit);
  }

  removeSelectedInventoryPattern(indexOfPattern: number) {
    this.globalFunctionService.presentAlertConfirm(
        'Warning',
        'Are you sure you want to remove the Inventory Pattern?',
        'Cancel',
        'Confirm',
        undefined,
        () => this.removeInventoryPattern(indexOfPattern));
  }

  removeInventoryPattern(index: number) {
    this.tempInventoryPatternsToInsert.splice(index, 1);
  }

  async openAddInventoryPatternModal() {
    const modal = await this.modalController.create({
      component: AddInventoryPatternModalPage,
      cssClass: 'dialog-modal'
    });
    modal.onDidDismiss().then((dataReturned) => {
      console.log('back from adding new pattern');
      console.log(dataReturned);
      if (dataReturned.data !== undefined && dataReturned.data !== null) {
        this.tempInventoryPatternsToInsert.push(dataReturned.data);
      }
    });
    return await modal.present();
  }
}
