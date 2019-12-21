import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AddInventoryPatternModalPage} from './add-inventory-pattern-modal/add-inventory-pattern-modal.page';
import {GlobalfunctionService} from '../../../../_dal/common/services/globalfunction.service';
import {commonConfig} from '../../../../_dal/common/commonConfig';

@Component({
  selector: 'app-inv-family-pattern-modal',
  templateUrl: './inv-family-pattern-modal.page.html',
  styleUrls: ['./inv-family-pattern-modal.page.scss'],
})

export class InvFamilyPatternModalPage implements OnInit {

  constructorName = '[' + this.constructor.name + ']';

  // Regex
  alphaNumericOnlyRegex = '^[a-zA-Z0-9_]+$';
  priceRegex = new RegExp(/^\d+(\.\d{2})?$/);
  numericOnlyRegex = commonConfig.numericOnlyRegex;

  // NgModels
  inventoryFamilyNameModel: string;
  inventoryFamilyCodeModel: string;
  inventoryFamilySKUModel: string;
  inventoryFamilyDescriptionModel: string;
  inventoryFamilyCostModel: number;
  inventoryFamilySellingPriceModel: number;
  inventoryFamilyStockQuantityModel: number;
  selectedFamilyOnSaleToggle = true;

  // Numbers
  inventoryFamilyNameMaxLength = 50;
  inventoryFamilyCodeMinLength = 2;
  inventoryFamilyCodeMaxLength = 30;
  inventoryFamilySKUMinLength = 2;
  inventoryFamilySKUMaxLength = 30;
  inventoryFamilyDescMinLength = 5;
  inventoryFamilyDescMaxLength = 50;
  inventoryFamilyCostMaxLength = 10;
  inventoryFamilySellingPriceMaxLength = 10;
  inventoryFamilyStockQuantityMaxLength = 3;

  // Arrays
  listOfInventoryPatterns: any[] = [];

  // Objects
  inventoryPatternToInsert: any;

  // FormGroups
  inventoryFamilyFormGroup: FormGroup;

  constructor(
      private router: Router,
      private modalController: ModalController,
      private globalFunctionService: GlobalfunctionService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.inventoryFamilyFormGroup = new FormGroup({
      inventoryFamilyName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(this.inventoryFamilyNameMaxLength)
      ]),
      inventoryFamilyCode: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.inventoryFamilyCodeMinLength),
        Validators.maxLength(this.inventoryFamilyCodeMaxLength)
        // Validators.pattern(this.alphaNumericOnlyRegex)
      ]),
      inventoryFamilySKU: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.inventoryFamilySKUMinLength),
        Validators.maxLength(this.inventoryFamilySKUMaxLength)
        // Validators.pattern(this.alphaNumericOnlyRegex)
      ]),
      inventoryFamilyDescription: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.inventoryFamilyDescMinLength),
        Validators.maxLength(this.inventoryFamilyDescMaxLength)
      ]),
      inventoryFamilyCost: new FormControl(null, [
        Validators.required,
        Validators.maxLength(this.inventoryFamilyCostMaxLength),
        Validators.pattern(this.priceRegex)
      ]),
      inventoryFamilySellingPrice: new FormControl(null, [
        Validators.required,
        Validators.maxLength(this.inventoryFamilySellingPriceMaxLength),
        Validators.pattern(this.priceRegex)
      ]),
      inventoryFamilyStockQuantity: new FormControl(null, [
        Validators.required,
        Validators.maxLength(this.inventoryFamilyStockQuantityMaxLength),
        Validators.pattern(this.numericOnlyRegex)
      ])
    });
  }

  toggleFamilyOnSaleCheckbox() {
    this.selectedFamilyOnSaleToggle = !this.selectedFamilyOnSaleToggle;
  }

  async openAddInventoryPatternModal() {
    const modal = await this.modalController.create({
      component: AddInventoryPatternModalPage,
      cssClass: 'dialog-modal'
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined && dataReturned.data !== null) {
          this.inventoryPatternToInsert = dataReturned.data;
          this.listOfInventoryPatterns.push(this.inventoryPatternToInsert);
        }
    });
    return await modal.present();
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
    this.listOfInventoryPatterns.splice(index, 1);
  }

  addFamily() {
    const inventoryFamilyToInsert = {
      code: this.inventoryFamilyCodeModel,
      cost: this.inventoryFamilyCostModel,
      // created_at
      desc: this.inventoryFamilyDescriptionModel,
      // id
      // imgpath
      // imgpublicid
      // inventory_id
      name: this.inventoryFamilyNameModel,
      onsale: this.selectedFamilyOnSaleToggle,
      patterns: this.listOfInventoryPatterns,
      price: this.inventoryFamilySellingPriceModel,
      qty: this.inventoryFamilyStockQuantityModel,
      // salesqty
      sku: this.inventoryFamilySKUModel
      // status
      // uid
      // updated_at
    };

    // TODO: Hard-coded data
    // const inventoryFamilyToInsert = {
    //   code: 'familycode123',
    //   cost: '4',
    //   // created_at
    //   desc: 'family description hahaha',
    //   // id
    //   // imgpath
    //   // imgpublicid
    //   // inventory_id
    //   name: 'family name here',
    //   onsale: true,
    //   patterns: this.listOfInventoryPatterns,
    //   price: '6',
    //   qty: '30',
    //   // salesqty
    //   sku: 'familysku9987'
    //   // status
    //   // uid
    //   // updated_at
    // };
    this.modalController.dismiss(inventoryFamilyToInsert);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
