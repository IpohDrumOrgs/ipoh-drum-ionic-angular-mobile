import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ShippingControllerServiceService} from '../../../../_dal/ipohdrum';
import {GlobalfunctionService} from '../../../../_dal/common/services/globalfunction.service';
import {LoadingService} from '../../../../_dal/common/services/loading.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-shipping-modal',
  templateUrl: './edit-shipping-modal.page.html',
  styleUrls: ['./edit-shipping-modal.page.scss'],
})

export class EditShippingModalPage implements OnInit, OnDestroy {

  constructorName = '[' + this.constructor.name + ']';
  shippingUid: string;
  weightRegex = new RegExp(/^\d+(\.\d+)?$/);

  allowToModify: boolean;
  isLoadingShipping = true;

  selectedStoreId: number;
  shippingPlanNameMaxLength = 50;
  shippingPlanDescriptionMinLength = 5;
  shippingPlanDescriptionMaxLength = 100;
  shippingPlanPriceMaxLength = 5;
  shippingPlanMaxWeightageMaxLength = 10;
  shippingPlanMaxDimensionMaxLength = 20;

  selectedShipping: any;

  shippingPlanFormGroup: FormGroup;

  getShippingByUidSubscription: any;
  updateShippingByUidSubscription: any;
  deleteShippingByUidSubscription: any;

  constructor(
      private modalController: ModalController,
      private ngZone: NgZone,
      private ref: ChangeDetectorRef,
      private shippingControllerService: ShippingControllerServiceService,
      private globalFunctionService: GlobalfunctionService,
      private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.ngZone.run(() => {
      this.loadingService.present();
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

      this.getShippingByUidSubscription = this.shippingControllerService.getShippingByUid(
          this.shippingUid
      ).subscribe(resp => {
        if (resp.code === 200) {
          this.selectedShipping = resp.data;
        } else {
          this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve the Shipping Plan, please try again later!', 'warning');
          this.closeEditShippingModal(false);
        }
        this.loadingService.dismiss();
        this.isLoadingShipping = false;
        this.ref.detectChanges();
      }, error => {
        this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve the Shipping Plan, please try again later!', 'danger');
        this.loadingService.dismiss();
        this.closeEditShippingModal(false);
        this.isLoadingShipping = false;
        this.ref.detectChanges();
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
      if (this.getShippingByUidSubscription) {
        this.getShippingByUidSubscription.unsubscribe();
      }
      if (this.updateShippingByUidSubscription) {
        this.updateShippingByUidSubscription.unsubscribe();
      }
      if (this.deleteShippingByUidSubscription) {
        this.deleteShippingByUidSubscription.unsubscribe();
      }
    });
  }

  closeEditShippingModal(returnFromEditShipping: boolean) {
    this.modalController.dismiss(returnFromEditShipping);
  }

  updateShippingPlan() {
    if (this.shippingPlanFormGroup.valid) {
      this.loadingService.present();
      this.updateShippingByUidSubscription = this.shippingControllerService.updateShippingByUid(
          this.shippingUid,
          this.selectedShipping.name,
          this.selectedShipping.store_id,
          this.selectedShipping.price,
          this.selectedShipping.maxweight,
          this.selectedShipping.maxdimension,
          this.selectedShipping.desc
      ).subscribe(resp => {
        if (resp.code === 200) {
          this.globalFunctionService.simpleToast('SUCCESS', 'The Shipping Plan has been updated!', 'success');
          this.closeEditShippingModal(true);
        } else {
          this.globalFunctionService.simpleToast('WARNING', 'Unable to update the Shipping Plan, please try again later!', 'warning');
        }
        this.loadingService.dismiss();
      }, error => {
        this.globalFunctionService.simpleToast('ERROR', 'Unable to update the Shpping Plan, please try again later!', 'danger');
        this.loadingService.dismiss();
      });
    }
  }

  deleteShippingPlan() {
    this.globalFunctionService.presentAlertConfirm(
        'Warning!',
        'Are you sure you want to delete the Shipping Plan?',
        'Cancel',
        'Confirm',
        undefined,
        () => this.confirmDeleteShipping());
  }

  confirmDeleteShipping() {
    this.loadingService.present();
    this.deleteShippingByUidSubscription = this.shippingControllerService.deleteShippingByUid(
        this.shippingUid
    ).subscribe(resp => {
      if (resp.code === 200) {
        this.globalFunctionService.simpleToast('SUCCESS', 'The Shipping Plan has been deleted!', 'success');
        this.closeEditShippingModal(true);
      } else {
        this.globalFunctionService.simpleToast('WARNING', 'Unable to delete the Shipping Plan, please try again later!', 'warning');
      }
      this.loadingService.dismiss();
    }, error => {
      this.loadingService.dismiss();
      this.globalFunctionService.simpleToast('ERROR', 'Unable to delete the Shipping Plan, please try again later!', 'danger');
    });
  }
}
