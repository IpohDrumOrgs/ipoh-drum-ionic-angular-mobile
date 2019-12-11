import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {AddInventoryPage} from './add-inventory/add-inventory.page';
import {Store, StoreControllerServiceService} from '../../_dal/ipohdrum';
import {StoreInventoryManagementModalPage} from './store-inventory-management-modal/store-inventory-management-modal.page';
import {LoadingService} from '../../_dal/common/services/loading.service';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.page.html',
  styleUrls: ['./my-store.page.scss'],
})

export class MyStorePage implements OnInit {

  // Strings
  constructorName = '[' + this.constructor.name + ']';

  // Numbers
  currentPageNumber = 1;
  currentPageSize = 10;

  // Booleans
  noInventoriesUploaded = true;
  noStoresCreated = true;

  // Arrays
  listOfCurrentUsersStores: Array<Store> = [];

  // Subscriptions
  getUsersListOfStoresSubscription: any;
  appendUsersListOfStoresSubscription: any;

  constructor(
      private ngZone: NgZone,
      private router: Router,
      private modalController: ModalController,
      private storeControllerService: StoreControllerServiceService,
      private loadingService: LoadingService
  ) {
    this.loadingService.present();
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.getUsersListOfStoresSubscription = this.storeControllerService.getStores(
          this.currentPageNumber,
          this.currentPageSize
      ).subscribe(resp => {
        console.log(resp);
        if (resp.code === 200) {
          this.listOfCurrentUsersStores = resp.data;
        } else {
          console.log('Unable to retrieve list of Stores');
        }
        this.loadingService.dismiss();
      }, error => {
        console.log('API Error while retrieving list of stores of current User');
      });
    });
  }

  async openCreateInventoryModal() {
    const modal = await this.modalController.create({
      component: AddInventoryPage
    });
    return await modal.present();
  }

  async openStoreInventoryManagementModal() {
      const modal = await this.modalController.create({
          component: StoreInventoryManagementModalPage
      });
      return await modal.present();
  }

  loadData(event) {
    setTimeout(() => {
      // console.log('Done');
      // this.currentPageNumber++;
      // this.appendUsersListOfStoresSubscription = this.storeControllerService.getStores(
      //     this.currentPageNumber,
      //     this.currentPageSize
      // ).subscribe(resp => {
      //   console.log(resp);
      //   if (resp.code === 200) {
      //     for (const tempStores of resp.data) {
      //       this.listOfCurrentUsersStores.push(tempStores);
      //     }
      //     console.log('final list store');
      //     console.log(this.listOfCurrentUsersStores);
      //   } else {
      //     console.log('Unable to retrieve list of Stores');
      //   }
      //   event.target.complete();
      // }, error => {
      //   console.log('API Error while retrieving list of stores of current User');
      //   event.target.complete();
      // });

      // // App logic to determine if all data is loaded
      // // and disable the infinite scroll
      // if (this.dataList.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }
}
