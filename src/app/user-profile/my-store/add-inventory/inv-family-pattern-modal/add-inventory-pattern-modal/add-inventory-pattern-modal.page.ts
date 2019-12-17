import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {commonConfig} from '../../../../../_dal/common/commonConfig';

@Component({
  selector: 'app-add-inventory-pattern-modal',
  templateUrl: './add-inventory-pattern-modal.page.html',
  styleUrls: ['./add-inventory-pattern-modal.page.scss'],
})

export class AddInventoryPatternModalPage implements OnInit {

  // Strings
  constructorName = '[' + this.constructor.name + ']';

  // Regex
  priceRegex = new RegExp(/^\d+(\.\d{2})?$/);
  numericOnlyRegex = commonConfig.numericOnlyRegex;

  // NgModels
  inventoryPatternNameModel: string;
  inventoryPatternDescriptionModel: string;
  inventoryPatternCostModel: number;
  inventoryPatternSellingPriceModel: number;
  inventoryPatternStockQuantityModel: number;
  selectedPatternOnSaleToggle = true;

  // Numbers
  inventoryPatternNameMaxLength = 50;
  inventoryPatternDescMinLength = 5;
  inventoryPatternDescMaxLength = 50;
  inventoryPatternCostMaxLength = 10;
  inventoryPatternSellingPriceMaxLength = 10;
  inventoryPatternStockQuantityMaxLength = 3;

  // FormGroups
  inventoryPatternFormGroup: FormGroup;

  constructor(
      private modalController: ModalController
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.inventoryPatternFormGroup = new FormGroup({
      inventoryPatternName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(this.inventoryPatternNameMaxLength)
      ]),
      inventoryPatternDescription: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.inventoryPatternDescMinLength),
        Validators.maxLength(this.inventoryPatternDescMaxLength)
      ]),
      inventoryPatternCost: new FormControl(null, [
        Validators.required,
        Validators.maxLength(this.inventoryPatternCostMaxLength),
        Validators.pattern(this.priceRegex)
      ]),
      inventoryPatternSellingPrice: new FormControl(null, [
        Validators.required,
        Validators.maxLength(this.inventoryPatternSellingPriceMaxLength),
        Validators.pattern(this.priceRegex)
      ]),
      inventoryPatternStockQuantity: new FormControl(null, [
        Validators.required,
        Validators.maxLength(this.inventoryPatternStockQuantityMaxLength),
        Validators.pattern(this.numericOnlyRegex)
      ])
    });
  }

  togglePatternOnSaleCheckbox() {
    this.selectedPatternOnSaleToggle = !this.selectedPatternOnSaleToggle;
  }

  addPattern() {
    // const inventoryPatternToInsert = {
    //   cost: this.inventoryPatternCostModel,
    //   // created_at
    //   desc: this.inventoryPatternDescriptionModel,
    //   // id
    //   // imgpath
    //   // imgpublicid
    //   // inventory_family_id
    //   name: this.inventoryPatternNameModel,
    //   onsale: this.selectedPatternOnSaleToggle,
    //   price: this.inventoryPatternSellingPriceModel,
    //   qty: this.inventoryPatternStockQuantityModel
    //   // salesqty
    //   // status
    //   // uid
    //   // updated_at
    // };

    // Hardcoded-Data
    const inventoryPatternToInsert = {
      cost: '59.60',
      // created_at
      desc: 'pattern desccccf sdfsdfs dfsdfsdfwerwerwer',
      // id
      // imgpath
      // imgpublicid
      // inventory_family_id
      name: 'pattern name',
      onsale: false,
      price: '60',
      qty: '99'
      // salesqty
      // status
      // uid
      // updated_at
    };
    console.log(inventoryPatternToInsert);
    this.modalController.dismiss(inventoryPatternToInsert);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
