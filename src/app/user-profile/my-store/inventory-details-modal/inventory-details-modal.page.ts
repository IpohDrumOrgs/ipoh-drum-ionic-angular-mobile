import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Inventory, InventoryControllerServiceService} from '../../../_dal/ipohdrum';
import {LoadingService} from '../../../_dal/common/services/loading.service';
import {ModalController} from '@ionic/angular';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';

@Component({
  selector: 'app-inventory-details-modal',
  templateUrl: './inventory-details-modal.page.html',
  styleUrls: ['./inventory-details-modal.page.scss'],
})

export class InventoryDetailsModalPage implements OnInit, OnDestroy {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  selectedInventoryUid: string;

  // Booleans
  isLoadingInventoryDetails = true;

  // Objects
  ionSliderOptions = {
    autoHeight: true,
    initialSlide: 0,
    speed: 400
  };
  currentInventoryDetails: Inventory;

  // Subscriptions
  getInventoryDetailsSubscription: any;

  constructor(
      private ngZone: NgZone,
      private loadingService: LoadingService,
      private modalController: ModalController,
      private globalFunctionService: GlobalfunctionService,
      private inventoryControllerService: InventoryControllerServiceService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.loadingService.present();
      this.isLoadingInventoryDetails = true;
      this.getInventoryDetailsSubscription = this.inventoryControllerService.getInventoryByUid(
          this.selectedInventoryUid
      ).subscribe(resp => {
        if (resp.code === 200) {
          this.currentInventoryDetails = resp.data;
        } else {
          // tslint:disable-next-line:max-line-length
          this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Inventory details, please try again later!', 'warning', 'top');
          this.closeInventoryDetailsModal();
        }
        this.loadingService.dismiss();
        this.isLoadingInventoryDetails = false;
      }, error => {
        console.log('API error unable to retrieve inventory details');
        console.log(error);
        this.loadingService.dismiss();
        this.isLoadingInventoryDetails = false;
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
      if (this.getInventoryDetailsSubscription) {
        this.getInventoryDetailsSubscription.unsubscribe();
      }
    });
  }

  closeInventoryDetailsModal() {
    this.modalController.dismiss();
  }
}
