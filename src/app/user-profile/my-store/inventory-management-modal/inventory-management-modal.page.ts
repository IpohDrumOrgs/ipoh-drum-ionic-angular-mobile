import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Inventory, Store, StoreControllerServiceService} from '../../../_dal/ipohdrum';
import {ModalController} from '@ionic/angular';
import {AddInventoryPage} from '../add-inventory/add-inventory.page';
import {LoadingService} from '../../../_dal/common/services/loading.service';
import {InventoryDetailsModalPage} from '../inventory-details-modal/inventory-details-modal.page';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';

@Component({
  selector: 'app-inventory-management-modal',
  templateUrl: './inventory-management-modal.page.html',
  styleUrls: ['./inventory-management-modal.page.scss'],
})

export class InventoryManagementModalPage implements OnInit, OnDestroy {

    // Strings
  constructorName = '[' + this.constructor.name + ']';
  selectedStoreUid: string;

  // Numbers
  selectedStoreId: number;
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
  getSelectedStoreByUidSubscription: any;
  appendListOfInventoriesByStoreUidSubscription: any;

  constructor(
      private ngZone: NgZone,
      private modalController: ModalController,
      private storeControllerService: StoreControllerServiceService,
      private loadingService: LoadingService,
      private globalFunctionService: GlobalfunctionService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
      this.ngZone.run(() => {
        this.getSelectedStoreByUidSubscription = this.storeControllerService.getStoreByUid(
            this.selectedStoreUid
        ).subscribe(resp => {
          if (resp.code === 200) {
            this.selectedStore = resp.data;
          }
        }, error => {
          console.log('API Error while retrieving store by uid');
        });
        this.retrieveListOfInventoriesByStoreUid();
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
      if (this.getListOfInventoriesByStoreUidSubscription) {
        this.getListOfInventoriesByStoreUidSubscription.unsubscribe();
      }
      if (this.appendListOfInventoriesByStoreUidSubscription) {
        this.appendListOfInventoriesByStoreUidSubscription.unsubscribe();
      }
    });
  }

  retrieveListOfInventoriesByStoreUid() {
    this.loadingService.present();
    if (this.getListOfInventoriesByStoreUidSubscription) {
      this.getListOfInventoriesByStoreUidSubscription.unsubscribe();
    }
    this.currentPageNumber = 1;
    this.getListOfInventoriesByStoreUidSubscription = this.storeControllerService.getInventoriesByStoreUid(
        this.selectedStoreUid,
        this.currentPageNumber,
        this.currentPageSize
    ).subscribe(resp => {
      if (resp.code === 200) {
        this.listOfInventoriesFromSelectedStore = resp.data;
        this.maximumPages = resp.maximumPages;
        this.totalResult = resp.totalResult;
      } else {
        // tslint:disable-next-line:max-line-length
        this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve list of Inventories, please try again later!', 'warning', 'top');
        this.closeInventoryManagementModal();
      }
      this.loadingService.dismiss();
    }, error => {
      console.log('API Error while retrieving list of inventories by store uid.');
      // tslint:disable-next-line:max-line-length
      this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve list of Inventories, please try again later!', 'warning', 'top');
      this.closeInventoryManagementModal();
      this.loadingService.dismiss();
    });
  }

  closeInventoryManagementModal() {
    this.modalController.dismiss();
  }

  async openCreateInventoryModal() {
    const modal = await this.modalController.create({
      component: AddInventoryPage,
      componentProps: {
        selectedStoreUid: this.selectedStoreUid,
        selectedStoreId: this.selectedStoreId
      }
    });
    modal.onDidDismiss().then((returnedFromCreatingInventory) => {
      if (returnedFromCreatingInventory.data) {
        this.retrieveListOfInventoriesByStoreUid();
      }
    });
    return await modal.present();
  }

  loadMoreInventoriesFromSelectedStore(event) {
    setTimeout(() => {
      if (this.maximumPages > this.currentPageNumber) {
        this.currentPageNumber++;
        this.appendListOfInventoriesByStoreUidSubscription = this.storeControllerService.getInventoriesByStoreUid(
            this.selectedStoreUid,
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

  async openEditInventoryDetailsModal(selectedInventoryUid) {
    const modal = await this.modalController.create({
      component: InventoryDetailsModalPage,
      componentProps: {
        selectedInventoryUid,
        selectedStoreUid: this.selectedStoreUid,
        selectedStoreId: this.selectedStoreId
      }
    });
    return await modal.present();
  }

  ionRefresh(event) {
    if (this.getListOfInventoriesByStoreUidSubscription) {
      this.getListOfInventoriesByStoreUidSubscription.unsubscribe();
    }
    this.currentPageNumber = 1;
    this.getListOfInventoriesByStoreUidSubscription = this.storeControllerService.getInventoriesByStoreUid(
        this.selectedStoreUid,
        this.currentPageNumber,
        this.currentPageSize
    ).subscribe(resp => {
      if (resp.code === 200) {
        this.listOfInventoriesFromSelectedStore = resp.data;
        this.maximumPages = resp.maximumPages;
        this.totalResult = resp.totalResult;
      } else {
        // tslint:disable-next-line:max-line-length
        this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve list of Inventories, please try again later!', 'warning', 'top');
        this.closeInventoryManagementModal();
      }
      event.target.complete();
    }, error => {
      console.log('API Error while retrieving list of inventories by store uid.');
      // tslint:disable-next-line:max-line-length
      this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve list of Inventories, please try again later!', 'warning', 'top');
      this.closeInventoryManagementModal();
      event.target.complete();
    });
  }
}
