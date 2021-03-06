import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {Store, StoreControllerServiceService} from '../../_dal/ipohdrum';
import {StoreInventoryManagementModalPage} from './store-inventory-management-modal/store-inventory-management-modal.page';
import {LoadingService} from '../../_dal/common/services/loading.service';
import {AddStoreModalPage} from './add-store-modal/add-store-modal.page';
import {GlobalfunctionService} from '../../_dal/common/services/globalfunction.service';
import {commonConfig} from '../../_dal/common/commonConfig';

@Component({
    selector: 'app-my-store',
    templateUrl: './my-store.page.html',
    styleUrls: ['./my-store.page.scss'],
})

export class MyStorePage implements OnInit, OnDestroy {

    constructorName = '[' + this.constructor.name + ']';

    currentPageNumber = 1;
    currentPageSize = commonConfig.currentPageSize;
    maximumPages: number;
    totalResult: number;

    referInfiniteScroll: any;

    listOfCurrentUsersStores: Array<Store> = [];

    getUsersListOfStoresSubscription: any;
    appendUsersListOfStoresSubscription: any;

    constructor(
        private ngZone: NgZone,
        private router: Router,
        private modalController: ModalController,
        private storeControllerService: StoreControllerServiceService,
        private loadingService: LoadingService,
        private globalFunctionService: GlobalfunctionService
    ) {}

    ngOnInit() {
        this.ngZone.run(() => {
            this.retrieveListOfStoresOfCurrentUser();
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
            if (this.getUsersListOfStoresSubscription) {
                this.getUsersListOfStoresSubscription.unsubscribe();
            }
            if (this.appendUsersListOfStoresSubscription) {
                this.appendUsersListOfStoresSubscription.unsubscribe();
            }
        });
    }

    retrieveListOfStoresOfCurrentUser() {
        this.loadingService.present();
        if (this.getUsersListOfStoresSubscription) {
            this.getUsersListOfStoresSubscription.unsubscribe();
        }
        this.currentPageNumber = 1;
        this.getUsersListOfStoresSubscription = this.storeControllerService.getStores(
            this.currentPageNumber,
            this.currentPageSize
        ).subscribe(resp => {
            if (resp.code === 200) {
                this.listOfCurrentUsersStores = resp.data;
                this.maximumPages = resp.maximumPages;
                this.totalResult = resp.totalResult;
            } else {
                this.listOfCurrentUsersStores = [];
                this.maximumPages = 0;
                this.totalResult = 0;
                // tslint:disable-next-line:max-line-length
                this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Store list info, please try again later!', 'warning', 'top');
            }
            this.loadingService.dismiss();
        }, error => {
            // tslint:disable-next-line:max-line-length
            this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve Store list info, please try again later!', 'danger', 'top');
            this.listOfCurrentUsersStores = [];
            this.maximumPages = 0;
            this.totalResult = 0;
            this.loadingService.dismiss();
        });
    }

    async openCreateStoreModal() {
        const modal = await this.modalController.create({
            component: AddStoreModalPage
        });
        modal.onDidDismiss().then((returnFromCreatingStore) => {
            if (returnFromCreatingStore.data) {
                this.retrieveListOfStoresOfCurrentUser();
                if (this.referInfiniteScroll) {
                    this.referInfiniteScroll.target.disabled = false;
                }
            }
        });
        return await modal.present();
    }

    async openStoreInventoryManagementModal(selectedStoreUid: string, selectedStoreId: number) {
        const modal = await this.modalController.create({
            component: StoreInventoryManagementModalPage,
            cssClass: 'store-management-modal',
            componentProps: {
                selectedStoreUid,
                selectedStoreId
            }
        });
        return await modal.present();
    }

    loadMoreStores(event) {
        this.referInfiniteScroll = event;
        setTimeout(() => {
            if (this.maximumPages > this.currentPageNumber) {
                this.currentPageNumber++;
                this.appendUsersListOfStoresSubscription = this.storeControllerService.getStores(
                    this.currentPageNumber,
                    this.currentPageSize
                ).subscribe(resp => {
                    if (resp.code === 200) {
                        for (const tempStores of resp.data) {
                            this.listOfCurrentUsersStores.push(tempStores);
                        }
                    }
                    this.referInfiniteScroll.target.complete();
                }, error => {
                    this.referInfiniteScroll.target.complete();
                });
            }
            if (this.totalResult === this.listOfCurrentUsersStores.length) {
                this.referInfiniteScroll.target.disabled = true;
            }
        }, 500);
    }

    ionRefresh(event) {
        if (this.referInfiniteScroll) {
            this.referInfiniteScroll.target.disabled = false;
        }
        if (this.getUsersListOfStoresSubscription) {
            this.getUsersListOfStoresSubscription.unsubscribe();
        }
        this.currentPageNumber = 1;
        this.getUsersListOfStoresSubscription = this.storeControllerService.getStores(
            this.currentPageNumber,
            this.currentPageSize
        ).subscribe(resp => {
            if (resp.code === 200) {
                this.listOfCurrentUsersStores = resp.data;
                this.maximumPages = resp.maximumPages;
                this.totalResult = resp.totalResult;
            } else {
                this.listOfCurrentUsersStores = [];
                this.maximumPages = 0;
                this.totalResult = 0;
                // tslint:disable-next-line:max-line-length
                this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Store list info, please try again later!', 'warning', 'top');
            }
            event.target.complete();
        }, error => {
            // tslint:disable-next-line:max-line-length
            this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve Store list info, please try again later!', 'danger', 'top');
            this.listOfCurrentUsersStores = [];
            event.target.complete();
        });
    }
}
