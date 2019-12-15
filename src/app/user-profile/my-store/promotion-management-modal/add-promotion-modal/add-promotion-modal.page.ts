import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from '../../../../_dal/common/services/loading.service';
import {GlobalfunctionService} from '../../../../_dal/common/services/globalfunction.service';
import {ProductPromotionControllerServiceService} from '../../../../_dal/ipohdrum';
import {ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-promotion-modal',
  templateUrl: './add-promotion-modal.page.html',
  styleUrls: ['./add-promotion-modal.page.scss'],
})

export class AddPromotionModalPage implements OnInit, OnDestroy {

  // Strings
  constructorName = '[' + this.constructor.name + ']';

  // Regex
  numericOnlyRegex = '^[0-9]+$';

  // NgModels
  promotionPlanNameModel: string;
  promotionPlanDescriptionModel: string;
  promotionPlanLimitedQuantityModel: number;
  promotionPlanDiscountByPriceFlagModel = true;
  promotionPlanStartDateModel = new Date().toISOString();
  promotionPlanEndDateModel = new Date().toISOString();

  // Numbers
  promotionPlanNameMinLength = 2;
  promotionPlanNameMaxLength = 50;
  promotionPlanDescriptionMinLength = 5;
  promotionPlanDescriptionMaxLength = 100;
  promotionPlanLimitedQuantityMaxLength = 5;

  // FormGroups
  promotionPlanFormGroup: FormGroup;

  constructor(
      private ngZone: NgZone,
      private loadingService: LoadingService,
      private globalFunctionService: GlobalfunctionService,
      private productPromotionController: ProductPromotionControllerServiceService,
      private modalController: ModalController
  ) {
    console.log(this.constructorName + 'Initializing component');
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
        promotionPlanStartDate: new FormControl(),
        promotionPlanEndDate: new FormControl()
      });
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

  validateSelectedDates() {

  }

  createPromotionPlan() {
    console.log('create promotion plan');
    console.log(this.promotionPlanStartDateModel);
    console.log(this.promotionPlanEndDateModel);
  }
}
