import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Inventory, Store, StoreControllerServiceService} from '../../../_dal/ipohdrum';
import {ModalController} from '@ionic/angular';
import {AddInventoryPage} from '../add-inventory/add-inventory.page';
import {LoadingService} from '../../../_dal/common/services/loading.service';

@Component({
  selector: 'app-inventory-management-modal',
  templateUrl: './inventory-management-modal.page.html',
  styleUrls: ['./inventory-management-modal.page.scss'],
})

export class InventoryManagementModalPage implements OnInit, OnDestroy {

    // Strings
  constructorName = '[' + this.constructor.name + ']';

  // Numbers
  currentPageNumber = 1;
  currentPageSize = 10;
  maximumPages: number;
  totalResult: number;

  // Arrays
  listOfInventoriesFromSelectedStore: Array<Inventory> = [];

  // Objects
  selectedStore: Store;

  // Subscriptions
  getListOfInventoriesByStoreUidSubscription: any;
  appendListOfInventoriesByStoreUidSubscription: any;

  constructor(
      private ngZone: NgZone,
      private modalController: ModalController,
      private storeControllerService: StoreControllerServiceService,
      private loadingService: LoadingService
  ) {
    console.log(this.constructorName + 'Initializing component');
    this.loadingService.present();
  }

  ngOnInit() {
      this.ngZone.run(() => {
          this.getListOfInventoriesByStoreUidSubscription = this.storeControllerService.getInventoriesByStoreUid(
              this.selectedStore.uid,
              this.currentPageNumber,
              this.currentPageSize
          ).subscribe(resp => {
            console.log(resp);
            if (resp.code === 200) {
              this.listOfInventoriesFromSelectedStore = resp.data;
              this.maximumPages = resp.maximumPages;
              this.totalResult = resp.totalResult;
            } else {
              this.listOfInventoriesFromSelectedStore = [];
            }
            console.log(this.listOfInventoriesFromSelectedStore);
            this.loadingService.dismiss();
          }, error => {
            this.listOfInventoriesFromSelectedStore = [];
            this.loadingService.dismiss();
          });
      });
  }

  ngOnDestroy() {
    this.unsubscribeSubscriptions();
  }

  ionViewWillLeave() {
    this.unsubscribeSubscriptions();
  }

  unsubscribeSubscriptions() {
    this.ngZone.run(() => {
      if (this.getListOfInventoriesByStoreUidSubscription) {
        this.getListOfInventoriesByStoreUidSubscription.unsubscribe();
      }
      if (this.appendListOfInventoriesByStoreUidSubscription) {
        this.appendListOfInventoriesByStoreUidSubscription.unsubscribe();
      }
    });
  }

  closeInventoryManagementModal() {
    this.modalController.dismiss();
  }

  async openCreateInventoryModal() {
    const modal = await this.modalController.create({
      component: AddInventoryPage,
      componentProps: {
        selectedStore: this.selectedStore
      }
    });
    return await modal.present();
  }

  loadMoreInventoriesFromSelectedStore(event) {
    setTimeout(() => {
      if (this.maximumPages > this.currentPageNumber) {
        this.currentPageNumber++;
        this.appendListOfInventoriesByStoreUidSubscription = this.storeControllerService.getInventoriesByStoreUid(
            this.selectedStore.uid,
            this.currentPageNumber,
            this.currentPageSize
        ).subscribe(resp => {
          if (resp.code === 200) {
            for (const tempInventories of resp.data) {
              this.listOfInventoriesFromSelectedStore.push(tempInventories);
            }
          }
          event.target.complete();
        }, error => {
          console.log('API Error while retrieving list of inventories of current Store');
          event.target.complete();
        });
      }
      if (this.totalResult === this.listOfInventoriesFromSelectedStore.length) {
        event.target.disabled = true;
      }
    }, 500);
  }
}
