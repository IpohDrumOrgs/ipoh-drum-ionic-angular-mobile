import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from '../../../../_dal/common/services/loading.service';
import {GlobalfunctionService} from '../../../../_dal/common/services/globalfunction.service';
import {ProductPromotionControllerServiceService, Store, StoreControllerServiceService} from '../../../../_dal/ipohdrum';
import {ModalController} from '@ionic/angular';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {commonConfig} from '../../../../_dal/common/commonConfig';

@Component({
  selector: 'app-add-promotion-modal',
  templateUrl: './add-promotion-modal.page.html',
  styleUrls: ['./add-promotion-modal.page.scss'],
})

export class AddPromotionModalPage implements OnInit, OnDestroy {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  selectedStoreUid: string;

  // Numbers
  selectedStoreId: number;

  // Regex
  priceRegex = new RegExp(/^\d+(\.\d{2})?$/);
  numericOnlyRegex = commonConfig.numericOnlyRegex;

  // NgModels
  promotionPlanNameModel: string;
  promotionPlanDescriptionModel: string;
  promotionPlanLimitedQuantityModel: number;
  promotionPlanDiscountByPriceFlagModel = true;
  promotionPlanDiscountedPriceModel: number; // float
  promotionPlanDiscountedPercentageModel: number; // integer
  promotionPlanStartDateModel = new Date().toISOString();
  promotionPlanEndDateModel = new Date().toISOString();

  // Numbers
  promotionPlanNameMinLength = 2;
  promotionPlanNameMaxLength = 50;
  promotionPlanDescriptionMinLength = 5;
  promotionPlanDescriptionMaxLength = 100;
  promotionPlanLimitedQuantityMaxLength = 5;

  // Objects
  selectedStore: Store;

  // FormGroups
  promotionPlanFormGroup: FormGroup;

  // Subscriptions
  createProductPromotionSubscription: any;

  constructor(
      private ref: ChangeDetectorRef,
      private ngZone: NgZone,
      private loadingService: LoadingService,
      private globalFunctionService: GlobalfunctionService,
      private productPromotionController: ProductPromotionControllerServiceService,
      private modalController: ModalController,
      private productPromotionControllerService: ProductPromotionControllerServiceService
  ) {
    console.log(this.constructorName + 'Initializing component');
    this.loadingService.present();
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.promotionPlanFormGroup = new FormGroup({
        promotionPlanName: new FormControl(null, [
            Validators.required,
            Validators.minLength(this.promotionPlanNameMinLength),
            Validators.maxLength(this.promotionPlanNameMaxLength)
        ]),
        promotionPlanDescription: new FormControl(null, [
            Validators.required,
            Validators.minLength(this.promotionPlanDescriptionMinLength),
            Validators.maxLength(this.promotionPlanDescriptionMaxLength)
        ]),
        promotionPlanLimitedQuantity: new FormControl(null, [
            Validators.required,
            Validators.maxLength(this.promotionPlanLimitedQuantityMaxLength),
            Validators.pattern(this.numericOnlyRegex)
        ]),
        promotionPlanDiscountByPriceFlag: new FormControl(),
        promotionPlanDiscountedPrice: new FormControl(),
        promotionPlanDiscountedPercentage: new FormControl(),
        promotionPlanStartDate: new FormControl(null, [
            this.validateSelectedDates
        ]),
        promotionPlanEndDate: new FormControl(null, [
          this.validateSelectedDates
        ])
      });
      this.enableDisableDiscountedPriceAndPercentage();
    });
  }

  ngOnDestroy() {
    this.unsubscribeSubscription();
  }

  ionViewDidLeave() {
    this.unsubscribeSubscription();
  }

  unsubscribeSubscription() {
    this.ngZone.run(() => {
        if (this.createProductPromotionSubscription) {
          this.createProductPromotionSubscription.unsubscribe();
        }
    });
  }

  async closeCreatePromotionModal(returnFromCreatingPromotion: boolean) {
    this.modalController.dismiss(returnFromCreatingPromotion);
  }

  selectedStartDate(event) {
    this.promotionPlanStartDateModel = event.detail.value;
  }

  selectedEndDate(event) {
    this.promotionPlanEndDateModel = event.detail.value;
  }

  validateSelectedDates = (c: AbstractControl): any => {
    if (!c.parent || !c) {
      return;
    }
    const startDate = c.parent.get('promotionPlanStartDate');
    const endDate = c.parent.get('promotionPlanEndDate');
    if (!startDate || !endDate) {
      return;
    }
    if (startDate.value > endDate.value) {
      this.promotionPlanFormGroup.get('promotionPlanStartDate').setErrors({
        invalidDate: true
      });
      this.promotionPlanFormGroup.get('promotionPlanEndDate').setErrors({
        invalidDate: true
      });
    }
  };

  toggleDiscountByPriceFlag() {
    this.enableDisableDiscountedPriceAndPercentage();
  }

  enableDisableDiscountedPriceAndPercentage() {
    if (this.promotionPlanDiscountByPriceFlagModel) {
      this.promotionPlanFormGroup.controls.promotionPlanDiscountedPrice.setValidators([
          Validators.required, Validators.pattern(this.priceRegex)
      ]);
      this.promotionPlanFormGroup.get('promotionPlanDiscountedPrice').enable();
      this.promotionPlanFormGroup.get('promotionPlanDiscountedPercentage').disable();
      this.promotionPlanFormGroup.get('promotionPlanDiscountedPercentage').reset();
      this.promotionPlanFormGroup.get('promotionPlanDiscountedPrice').reset();
    } else {
      this.promotionPlanFormGroup.controls.promotionPlanDiscountedPercentage.setValidators([
          Validators.required, Validators.pattern(this.priceRegex)
      ]);
      this.promotionPlanFormGroup.get('promotionPlanDiscountedPrice').disable();
      this.promotionPlanFormGroup.get('promotionPlanDiscountedPercentage').enable();
      this.promotionPlanFormGroup.get('promotionPlanDiscountedPercentage').reset();
      this.promotionPlanFormGroup.get('promotionPlanDiscountedPrice').reset();
    }
  }

  createPromotionPlan() {
    console.log('create promotion plan');
    console.log(this.promotionPlanStartDateModel);
    console.log(this.promotionPlanEndDateModel);
    console.log(this.promotionPlanEndDateModel > this.promotionPlanStartDateModel);
    console.log(this.promotionPlanEndDateModel < this.promotionPlanStartDateModel);
//     if (this.promotionPlanFormGroup.valid) {
//       this.loadingService.present();
//       this.createProductPromotionSubscription = this.productPromotionControllerService.createProductPromotion(
//         this.selectedStoreId,
//          this.promotionPlanNameModel,
//           this.promotionPlanDiscountByPriceFlagModel,
//           this.promotionPlanDescriptionModel,
//           this.promotionPlanLimitedQuantityModel,
//
//       ).subscribe(resp => {
//         if (resp.code === 200) {
//
//         } else {
//
//         }
//       }, error => {
//         console.log('API Error while creating a new Product Promotion');
//       });
//     }
  }
}
