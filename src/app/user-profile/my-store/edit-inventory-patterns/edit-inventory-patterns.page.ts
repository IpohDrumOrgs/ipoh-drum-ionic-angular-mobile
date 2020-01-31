import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {Pattern} from '../../../_dal/ipohdrum';
import {ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {commonConfig} from '../../../_dal/common/commonConfig';

@Component({
    selector: 'app-edit-inventory-patterns',
    templateUrl: './edit-inventory-patterns.page.html',
    styleUrls: ['./edit-inventory-patterns.page.scss'],
})

export class EditInventoryPatternsPage implements OnInit {

    constructorName = '[' + this.constructor.name + ']';
    priceRegex = new RegExp(/^\d+(\.\d{2})?$/);
    numericOnlyRegex = commonConfig.numericOnlyRegex;

    inventoryPatternOnSaleFlagModel: boolean;

    inventoryPatternNameMaxLength = commonConfig.inventoryPatternNameMaxLength;
    inventoryPatternDescMinLength = commonConfig.inventoryPatternDescMinLength;
    inventoryPatternDescMaxLength = commonConfig.inventoryPatternDescMaxLength;
    inventoryPatternCostMaxLength = commonConfig.inventoryPatternCostMaxLength;
    inventoryPatternSellingPriceMaxLength = commonConfig.inventoryPatternSellingPriceMaxLength;
    inventoryPatternStockQuantityMaxLength = commonConfig.inventoryPatternStockQuantityMaxLength;

    inventoryPatternToEdit: Pattern;
    referenceInventoryPatternsToEdit: Pattern;

    inventoryPatternFormGroup: FormGroup;

    constructor(
        private ref: ChangeDetectorRef,
        private ngZone: NgZone,
        private modalController: ModalController
    ) {}

    ngOnInit() {
        this.ngZone.run(() => {
            this.referenceInventoryPatternsToEdit = Object.assign({}, this.inventoryPatternToEdit);
          // tslint:disable-next-line:max-line-length
            this.referenceInventoryPatternsToEdit.onsale === 1 ? this.inventoryPatternOnSaleFlagModel = true : this.inventoryPatternOnSaleFlagModel = false;
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
                ]),
                inventoryPatternOnSaleFlag: new FormControl()
            });
            this.ref.detectChanges();
        });
    }

    closeEditInventoryPatternModal() {
        this.modalController.dismiss();
    }

    closeAndPassEditedInventoryPatternModal() {
      // tslint:disable-next-line:max-line-length
        this.inventoryPatternOnSaleFlagModel === true ? this.referenceInventoryPatternsToEdit.onsale = 1 : this.referenceInventoryPatternsToEdit.onsale = 0;
        this.modalController.dismiss(this.referenceInventoryPatternsToEdit);
    }
}
