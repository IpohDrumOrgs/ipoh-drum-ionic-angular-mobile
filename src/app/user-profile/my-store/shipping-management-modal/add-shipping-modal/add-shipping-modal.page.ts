import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {LoadingService} from '../../../../_dal/common/services/loading.service';
import {GlobalfunctionService} from '../../../../_dal/common/services/globalfunction.service';
import {ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ShippingControllerServiceService} from '../../../../_dal/ipohdrum';

@Component({
    selector: 'app-add-shipping-modal',
    templateUrl: './add-shipping-modal.page.html',
    styleUrls: ['./add-shipping-modal.page.scss'],
})

export class AddShippingModalPage implements OnInit, OnDestroy {

    constructorName = '[' + this.constructor.name + ']';
    selectedStoreUid: string;
    weightRegex = new RegExp(/^\d+(\.\d+)?$/);

    shippingPlanNameModel: string;
    shippingPlanDescriptionModel: string;
    shippingPlanPriceModel: number;
    shippingPlanMaxWeightageModel: number;
    shippingPlanMaxDimensionModel: number;

    selectedStoreId: number;
    shippingPlanNameMaxLength = 50;
    shippingPlanDescriptionMinLength = 5;
    shippingPlanDescriptionMaxLength = 100;
    shippingPlanPriceMaxLength = 5;
    shippingPlanMaxWeightageMaxLength = 10;
    shippingPlanMaxDimensionMaxLength = 20;

    shippingPlanFormGroup: FormGroup;

    createShippingPlanSubscription: any;

    constructor(
        private ngZone: NgZone,
        private loadingService: LoadingService,
        private globalFunctionService: GlobalfunctionService,
        private modalController: ModalController,
        private shippingControllerService: ShippingControllerServiceService
    ) {}

    ngOnInit() {
        this.ngZone.run(() => {
            this.shippingPlanFormGroup = new FormGroup({
                shippingPlanName: new FormControl(null, [
                    Validators.required,
                    Validators.maxLength(this.shippingPlanNameMaxLength)
                ]),
                shippingPlanDescription: new FormControl(null, [
                    Validators.minLength(this.shippingPlanDescriptionMinLength),
                    Validators.maxLength(this.shippingPlanDescriptionMaxLength)
                ]),
                shippingPlanPrice: new FormControl(null, [
                    Validators.required,
                    Validators.pattern(this.weightRegex),
                    Validators.maxLength(this.shippingPlanPriceMaxLength)
                ]),
                shippingPlanMaxWeightage: new FormControl(null, [
                    Validators.required,
                    Validators.pattern(this.weightRegex),
                    Validators.maxLength(this.shippingPlanMaxWeightageMaxLength)
                ]),
                shippingPlanMaxDimension: new FormControl(null, [
                    Validators.required,
                    Validators.pattern(this.weightRegex),
                    Validators.maxLength(this.shippingPlanMaxDimensionMaxLength)
                ])
            });
        });
    }

    ngOnDestroy() {
        this.unsubscribeSubscriptions();
    }

    ionViewDidLeave() {
        this.unsubscribeSubscriptions();
    }

    unsubscribeSubscriptions() {
        this.ngZone.run(() => {
            if (this.createShippingPlanSubscription) {
                this.createShippingPlanSubscription.unsubscribe();
            }
        });
    }

    closeCreateShippingModal(returnFromCreatingShipping: boolean) {
        this.modalController.dismiss(returnFromCreatingShipping);
    }

    createShippingPlan() {
        if (this.shippingPlanFormGroup.valid) {
            this.loadingService.present();
            if (this.createShippingPlanSubscription) {
                this.createShippingPlanSubscription.unsubscribe();
            }
            this.createShippingPlanSubscription = this.shippingControllerService.createShipping(
                this.shippingPlanNameModel,
                this.shippingPlanPriceModel,
                this.shippingPlanMaxWeightageModel,
                this.shippingPlanMaxDimensionModel,
                this.selectedStoreId,
                this.shippingPlanDescriptionModel
            ).subscribe(resp => {
                if (resp.code === 200) {
                    this.globalFunctionService.simpleToast('SUCCESS', 'The Shipping Plan has been created!', 'success');
                    this.closeCreateShippingModal(true);
                } else {
                    // tslint:disable-next-line:max-line-length
                    this.globalFunctionService.simpleToast('WARNING', 'Unable to create the Shipping plan, please try again later!', 'warning');
                }
                this.loadingService.dismiss();
            }, error => {
                this.globalFunctionService.simpleToast('ERROR', 'Unable to create the Shipping plan, please try again later!', 'danger');
                this.loadingService.dismiss();
            });
        }
    }
}
