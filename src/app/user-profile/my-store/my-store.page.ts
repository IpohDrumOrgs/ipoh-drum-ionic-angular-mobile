import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {Store, StoreControllerServiceService} from '../../_dal/ipohdrum';
import {StoreInventoryManagementModalPage} from './store-inventory-management-modal/store-inventory-management-modal.page';
import {LoadingService} from '../../_dal/common/services/loading.service';
import {AddStoreModalPage} from './add-store-modal/add-store-modal.page';
import {GlobalfunctionService} from '../../_dal/common/services/globalfunction.service';

@Component({
    selector: 'app-my-store',
    templateUrl: './my-store.page.html',
    styleUrls: ['./my-store.page.scss'],
})

export class MyStorePage implements OnInit, OnDestroy {

    // Strings
    constructorName = '[' + this.constructor.name + ']';

    // Numbers
    currentPageNumber = 1;
    currentPageSize = 10;
    maximumPages: number;
    totalResult: number;

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
        private loadingService: LoadingService,
        private globalFunctionService: GlobalfunctionService
    ) {
        console.log(this.constructorName + 'Initializing component');
    }

    ngOnInit() {
        this.ngZone.run(() => {
            this.retrieveListOfStoresOfCurrentUser();
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
                // tslint:disable-next-line:max-line-length
                this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Store list info, please try again later!', 'warning', 'top');
                console.log('Unable to retrieve list of Stores');
            }
            this.loadingService.dismiss();
        }, error => {
            // tslint:disable-next-line:max-line-length
            this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Store list info, please try again later!', 'warning', 'top');
            this.listOfCurrentUsersStores = [];
            this.loadingService.dismiss();
            console.log('API Error while retrieving list of stores of current User');
        });
    }

    async openCreateStoreModal() {
        const modal = await this.modalController.create({
            component: AddStoreModalPage
        });
        modal.onDidDismiss().then((returnFromCreatingStore) => {
            if (returnFromCreatingStore.data) {
                this.retrieveListOfStoresOfCurrentUser();
            }
        });
        return await modal.present();
    }

    async openStoreInventoryManagementModal(selectedStoreUid: string) {
        const modal = await this.modalController.create({
            component: StoreInventoryManagementModalPage,
            cssClass: 'store-management-modal',
            componentProps: {
                selectedStoreUid
            }
        });
        return await modal.present();
    }

    loadMoreStores(event) {
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
                    event.target.complete();
                }, error => {
                    console.log('API Error while retrieving list of stores of current User');
                    event.target.complete();
                });
            }
            if (this.totalResult === this.listOfCurrentUsersStores.length) {
                event.target.disabled = true;
            }
        }, 500);
    }
}
