import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ProductPromotion, ProductPromotionControllerServiceService} from '../../../_dal/ipohdrum';
import {LoadingService} from '../../../_dal/common/services/loading.service';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';
import {InventoryManagementModalPage} from '../inventory-management-modal/inventory-management-modal.page';
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

  // Arrays
  listOfProductPromotions: Array<ProductPromotion> = [];

  // Subscriptions
  getListOfProductPromotionsByStoreId: any;

  constructor(
      private ngZone: NgZone,
      private loadingService: LoadingService,
      private modalController: ModalController,
      private globalFunctionService: GlobalfunctionService,
      private productPromotionControllerService: ProductPromotionControllerServiceService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.loadingService.present();
      this.getListOfProductPromotionsByStoreId = this.productPromotionControllerService.getProductPromotionByUid(
        this.selectedStoreUid
      ).subscribe(resp => {
        console.log(resp);
        if (resp.code === 200) {
          this.listOfProductPromotions = resp.data;
        } else {
          this.loadingService.dismiss();
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
    return await modal.present();
  }
}
