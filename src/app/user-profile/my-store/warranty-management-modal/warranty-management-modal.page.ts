import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddWarrantyModalPage} from './add-warranty-modal/add-warranty-modal.page';
import {StoreControllerServiceService, WarrantyControllerServiceService} from '../../../_dal/ipohdrum';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';
import {LoadingService} from '../../../_dal/common/services/loading.service';
import {EditWarrantyModalPage} from './edit-warranty-modal/edit-warranty-modal.page';

@Component({
    selector: 'app-warranty-management-modal',
    templateUrl: './warranty-management-modal.page.html',
    styleUrls: ['./warranty-management-modal.page.scss'],
})

export class WarrantyManagementModalPage implements OnInit, OnDestroy {

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
    listOfWarrantiesByStoreUid: Array<any> = [];

    // Subscriptions
    getListOfWarrantiesByStoreUidSubscription: any;
    appendListOfWarrantiesSubscription: any;

    constructor(
        private ngZone: NgZone,
        private modalController: ModalController,
        private loadingService: LoadingService,
        private warrantyControllerService: WarrantyControllerServiceService,
        private globalFunctionService: GlobalfunctionService,
        private storeControllerService: StoreControllerServiceService
    ) {
        console.log(this.constructorName + 'Initializing component');
    }

    ngOnInit() {
        this.ngZone.run(() => {
           this.retrieveListOfWarrantiesByStoreUid();
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
        if (this.getListOfWarrantiesByStoreUidSubscription) {
          this.getListOfWarrantiesByStoreUidSubscription.unsubscribe();
        }
        if (this.appendListOfWarrantiesSubscription) {
          this.appendListOfWarrantiesSubscription.unsubscribe();
        }
      });
    }

    retrieveListOfWarrantiesByStoreUid() {
        this.loadingService.present();
        if (this.getListOfWarrantiesByStoreUidSubscription) {
            this.getListOfWarrantiesByStoreUidSubscription.unsubscribe();
        }
        this.getListOfWarrantiesByStoreUidSubscription = this.storeControllerService.getWarrantiesByStoreUid(
            this.selectedStoreUid,
            this.currentPageNumber,
            this.currentPageSize
        ).subscribe(resp => {
            console.log(resp);
            if (resp.code === 200) {
                this.listOfWarrantiesByStoreUid = resp.data;
                this.maximumPages = resp.maximumPages;
                this.totalResult = resp.totalResult;
            } else {
                // tslint:disable-next-line:max-line-length
                this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Warranty list, please try again later!', 'warning');
                this.closeWarrantyManagementModal();
            }
            this.loadingService.dismiss();
        }, error => {
            console.log('API Error while retrieving list of warranties by store uid.');
            this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Warranty list, please try again later!', 'warning');
            this.closeWarrantyManagementModal();
            this.loadingService.dismiss();
        });
    }

    async closeWarrantyManagementModal() {
        await this.modalController.dismiss();
    }

    async openCreateWarrantyModal() {
        const modal = await this.modalController.create({
            component: AddWarrantyModalPage,
            componentProps: {
                selectedStoreUid: this.selectedStoreUid,
                selectedStoreId: this.selectedStoreId
            }
        });
        modal.onDidDismiss().then((returnedFromCreatingWarranty) => {
            if (returnedFromCreatingWarranty.data) {
                this.retrieveListOfWarrantiesByStoreUid();
            }
        });
        return await modal.present();
    }

    async openEditWarrantyModal(warrantyUid: string, allowToModify: boolean) {
        const modal = await this.modalController.create({
            component: EditWarrantyModalPage,
            componentProps: {
                warrantyUid,
                allowToModify
            }
        });
        modal.onDidDismiss().then((returnedFromEditingWarranty) => {
            if (returnedFromEditingWarranty.data) {
                this.retrieveListOfWarrantiesByStoreUid();
            }
        });
        return await modal.present();
    }

  loadMoreWarranties(event) {
    setTimeout(() => {
      if (this.maximumPages > this.currentPageNumber) {
        this.currentPageNumber++;
        this.appendListOfWarrantiesSubscription = this.storeControllerService.getWarrantiesByStoreUid(
            this.selectedStoreUid,
            this.currentPageNumber,
            this.currentPageSize
        ).subscribe(resp => {
          if (resp.code === 200) {
            for (const tempWarranty of resp.data) {
              this.listOfWarrantiesByStoreUid.push(tempWarranty);
            }
          }
          event.target.complete();
        }, error => {
          console.log('API Error while retrieving list of warranties of current storeuid.');
          event.target.complete();
        });
      }
      if (this.totalResult === this.listOfWarrantiesByStoreUid.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

    ionRefresh(event) {
        if (this.getListOfWarrantiesByStoreUidSubscription) {
            this.getListOfWarrantiesByStoreUidSubscription.unsubscribe();
        }
        this.currentPageNumber = 1;
        this.getListOfWarrantiesByStoreUidSubscription = this.storeControllerService.getWarrantiesByStoreUid(
            this.selectedStoreUid,
            this.currentPageNumber,
            this.currentPageSize
        ).subscribe(resp => {
            if (resp.code === 200) {
                this.listOfWarrantiesByStoreUid = resp.data;
                this.maximumPages = resp.maximumPages;
                this.totalResult = resp.totalResult;
            } else {
                // tslint:disable-next-line:max-line-length
                this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Warranty list, please try again later!', 'warning');
            }
            event.target.complete();
        }, error => {
            console.log('API Error while retrieving list of warranties by store uid.');
            this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Warranty list, please try again later!', 'warning');
            event.target.complete();
        });
    }
}