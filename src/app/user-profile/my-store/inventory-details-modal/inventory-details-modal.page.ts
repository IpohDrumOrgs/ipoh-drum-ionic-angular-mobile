import {Component, NgZone, OnInit} from '@angular/core';
import {Inventory, InventoryControllerServiceService} from '../../../_dal/ipohdrum';
import {LoadingService} from '../../../_dal/common/services/loading.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-inventory-details-modal',
  templateUrl: './inventory-details-modal.page.html',
  styleUrls: ['./inventory-details-modal.page.scss'],
})

export class InventoryDetailsModalPage implements OnInit {

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
      private inventoryControllerService: InventoryControllerServiceService
  ) {
    console.log(this.constructorName + 'Initializing component');
    this.loadingService.present();
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.isLoadingInventoryDetails = true;
      this.getInventoryDetailsSubscription = this.inventoryControllerService.getInventoryByUid(
          this.selectedInventoryUid
      ).subscribe(resp => {
        console.log(resp);
        if (resp.code === 200) {
          this.currentInventoryDetails = resp.data;
        } else {
          // TODO: Show error message, redirect to My Store page
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

  closeInventoryDetailsModal() {
    this.modalController.dismiss();
  }
}
