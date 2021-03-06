import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from '../../../../_dal/common/services/loading.service';
import {GlobalfunctionService} from '../../../../_dal/common/services/globalfunction.service';
import {ProductPromotionControllerServiceService, Store} from '../../../../_dal/ipohdrum';
import {ModalController} from '@ionic/angular';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {commonConfig} from '../../../../_dal/common/commonConfig';

@Component({
    selector: 'app-add-promotion-modal',
    templateUrl: './add-promotion-modal.page.html',
    styleUrls: ['./add-promotion-modal.page.scss'],
})

export class AddPromotionModalPage implements OnInit, OnDestroy {

    constructorName = '[' + this.constructor.name + ']';
    selectedStoreUid: string;
    priceRegex = new RegExp(/^\d+(\.\d{2})?$/);
    numericOnlyRegex = commonConfig.numericOnlyRegex;
    percentageRegex = commonConfig.percentageRegex;

    selectedStoreId: number;

    promotionPlanNameModel: string;
    promotionPlanDescriptionModel: string;
    promotionPlanLimitedQuantityModel: number;
    promotionPlanDiscountByPriceFlagModel = true;
    promotionPlanDiscountedPriceModel: number;
    promotionPlanDiscountedPercentageModel: number;
    promotionPlanStartDateModel = new Date().toISOString();
    promotionPlanEndDateModel = new Date().toISOString();

    promotionPlanNameMinLength = 2;
    promotionPlanNameMaxLength = 50;
    promotionPlanDescriptionMinLength = 5;
    promotionPlanDescriptionMaxLength = 100;
    promotionPlanLimitedQuantityMaxLength = 5;
    percentageMaxValue = 100;

    promotionPlanFormGroup: FormGroup;

    createProductPromotionSubscription: any;

    constructor(
        private ref: ChangeDetectorRef,
        private ngZone: NgZone,
        private loadingService: LoadingService,
        private globalFunctionService: GlobalfunctionService,
        private productPromotionController: ProductPromotionControllerServiceService,
        private modalController: ModalController,
        private productPromotionControllerService: ProductPromotionControllerServiceService
    ) {}

    ngOnInit() {
        this.ngZone.run(() => {
            this.promotionPlanFormGroup = new FormGroup({
                promotionPlanName: new FormControl(null, [
                    Validators.required,
                    Validators.maxLength(this.promotionPlanNameMaxLength)
                ]),
                promotionPlanDescription: new FormControl(null, [
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

    closeCreatePromotionModal(returnFromCreatingPromotion: boolean) {
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
                Validators.required, Validators.pattern(this.percentageRegex), Validators.max(this.percentageMaxValue), Validators.min(0)
            ]);
            this.promotionPlanFormGroup.get('promotionPlanDiscountedPrice').disable();
            this.promotionPlanFormGroup.get('promotionPlanDiscountedPercentage').enable();
            this.promotionPlanFormGroup.get('promotionPlanDiscountedPercentage').reset();
            this.promotionPlanFormGroup.get('promotionPlanDiscountedPrice').reset();
        }
    }

    createPromotionPlan() {
        if (this.promotionPlanFormGroup.valid) {
            this.loadingService.present();
            this.createProductPromotionSubscription = this.productPromotionControllerService.createProductPromotion(
                this.promotionPlanNameModel,
                this.promotionPlanDiscountByPriceFlagModel ? 1 : 0,
                this.selectedStoreId,
                this.promotionPlanDescriptionModel,
                this.promotionPlanLimitedQuantityModel,
                this.promotionPlanDiscountedPriceModel,
                this.promotionPlanDiscountedPercentageModel,
                this.promotionPlanStartDateModel.toString().substring(0, 10),
                this.promotionPlanEndDateModel.toString().substring(0, 10)
            ).subscribe(resp => {
                if (resp.code === 200) {
                  this.globalFunctionService.simpleToast('SUCCESS', 'The Promotion Plan has been created!', 'success');
                  this.closeCreatePromotionModal(true);
                } else {
                  this.globalFunctionService.simpleToast('WARNING', 'Unable to create the Promotion Plan, please try again later!', 'warning');
                }
                this.loadingService.dismiss();
            }, error => {
                this.globalFunctionService.simpleToast('ERROR', 'Unable to create the Promotion Plan, please try again later!', 'danger');
                this.loadingService.dismiss();
            });
        }
    }
}
