import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ProductPromotion, ProductPromotionControllerServiceService, StoreControllerServiceService} from '../../../_dal/ipohdrum';
import {LoadingService} from '../../../_dal/common/services/loading.service';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';
import {AddPromotionModalPage} from './add-promotion-modal/add-promotion-modal.page';

@Component({
  selector: 'app-promotion-management-modal',
  templateUrl: './promotion-management-modal.page.html',
  styleUrls: ['./promotion-management-modal.page.scss'],
})

export class PromotionManagementModalPage implements OnInit, OnDestroy {

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
  listOfProductPromotions: Array<any> = [];

  // Subscriptions
  getListOfProductPromotionsByStoreId: any;
  appendListOfProductPromotionsByStoreId: any;

  constructor(
      private ngZone: NgZone,
      private loadingService: LoadingService,
      private modalController: ModalController,
      private globalFunctionService: GlobalfunctionService,
      private productPromotionControllerService: ProductPromotionControllerServiceService,
      private storeControllerService: StoreControllerServiceService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.retrieveListOfProductPromotionsByStoreUid();
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
      if (this.getListOfProductPromotionsByStoreId) {
        this.getListOfProductPromotionsByStoreId.unsubscribe();
      }
      if (this.appendListOfProductPromotionsByStoreId) {
        this.appendListOfProductPromotionsByStoreId.unsubscribe();
      }
    });
  }

  retrieveListOfProductPromotionsByStoreUid() {
    this.loadingService.present();
    this.getListOfProductPromotionsByStoreId = this.storeControllerService.getPromotionsByStoreUid(
        this.selectedStoreUid
    ).subscribe(resp => {
      console.log(resp);
      if (resp.code === 200) {
        this.listOfProductPromotions = resp.data;
      } else {
        this.loadingService.dismiss();
        // tslint:disable-next-line:max-line-length
        this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve list of Promotion Plans, please try again later!', 'warning');
        // this.closePromotionManagementModal();
      }
      this.loadingService.dismiss();
    }, error => {
      console.log('API Error while retrieving list of productpromotion by store uid.');
      this.loadingService.dismiss();
      this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve list of Promotion Plans, please try again later!', 'warning');
      // this.closePromotionManagementModal();
    });
  }

  async closePromotionManagementModal() {
    await this.modalController.dismiss();
  }

  async openCreatePromotionPlanModal() {
    const modal = await this.modalController.create({
      component: AddPromotionModalPage,
      componentProps: {
        selectedStoreUid: this.selectedStoreUid,
        selectedStoreId: this.selectedStoreId
      }
    });
    modal.onDidDismiss().then((returnedFromCreatingPromo) => {
      if (returnedFromCreatingPromo.data) {
        this.retrieveListOfProductPromotionsByStoreUid();
      }
    });
    return await modal.present();
  }

  loadMoreProductPromotions(event) {
    setTimeout(() => {
      if (this.maximumPages > this.currentPageNumber) {
        this.currentPageNumber++;
        this.appendListOfProductPromotionsByStoreId = this.storeControllerService.getPromotionsByStoreUid(
            this.selectedStoreUid,
            this.currentPageNumber,
            this.currentPageSize
        ).subscribe(resp => {
          if (resp.code === 200) {
            for (const tempPromo of resp.data) {
              this.listOfProductPromotions.push(tempPromo);
            }
          }
          event.target.complete();
        }, error => {
          console.log('API Error while retrieving list of promos of current storeuid.');
          event.target.complete();
        });
      }
      if (this.totalResult === this.listOfProductPromotions.length) {
        event.target.disabled = true;
      }
    }, 500);
  }
}
