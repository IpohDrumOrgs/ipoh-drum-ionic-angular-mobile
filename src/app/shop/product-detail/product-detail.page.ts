import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Inventory, InventoryControllerServiceService} from '../../_dal/ipohdrum';
import {ProductVariationModalPage} from './product-variation-modal/product-variation-modal.page';
import {ModalController} from '@ionic/angular';
import {GlobalfunctionService} from '../../_dal/common/services/globalfunction.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.page.html',
    styleUrls: ['./product-detail.page.scss'],
})

export class ProductDetailPage implements OnInit, OnDestroy {

    // Strings
    constructorName = '[' + this.constructor.name + ']';
    inventoryUID: string;

    // Booleans
    isLoadingInventory = true;

    // Objects
    currentInventory: Inventory;
    ionSliderOptions = {
        autoHeight: true,
        initialSlide: 0,
        speed: 400
    };

    // Subscriptions
    currentInventorySubscription: any;
    routerEventsSubscription: any;

    constructor(
        private location: Location,
        private router: Router,
        private route: ActivatedRoute,
        private ngZone: NgZone,
        private modalController: ModalController,
        private inventoryControllerService: InventoryControllerServiceService,
        private globalFunctionService: GlobalfunctionService
    ) {
        console.log(this.constructorName + 'Initializing component');
    }

    ngOnInit() {
        this.ngZone.run(() => {
            this.retrieveSelectedInventoryInfo();
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
            if (this.currentInventorySubscription) {
                this.currentInventorySubscription.unsubscribe();
            }
            if (this.routerEventsSubscription) {
                this.routerEventsSubscription.unsubscribe();
            }
        });
    }

    retrieveSelectedInventoryInfo() {
        this.isLoadingInventory = true;
        this.route.params.subscribe(params => {
            this.inventoryUID = params.uid;
            if (this.currentInventorySubscription) {
                this.currentInventorySubscription.unsubscribe();
            }
            this.currentInventorySubscription = this.inventoryControllerService.getOnSaleInventoryByUid(
                this.inventoryUID.toString()
            ).subscribe(resp => {
                console.log(resp);
                if (resp.code === 200) {
                    this.currentInventory = resp.data;
                } else {
                    // tslint:disable-next-line:max-line-length
                    this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve the selected Inventory info, please try again later!', 'danger');
                    this.backToShopPage();
                }
                this.isLoadingInventory = false;
            }, error => {
                console.log('cannot get item');
                this.isLoadingInventory = false;
                // tslint:disable-next-line:max-line-length
                this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve the selected Inventory info, please try again later!', 'danger');
                this.backToShopPage();
            });
        });
    }

    backToShopPage() {
        this.location.back();
    }

    async openProductVariationsModal() {
        const modal = await this.modalController.create({
            component: ProductVariationModalPage,
            cssClass: 'dialog-modal',
            componentProps: {
                selectedInventory: this.currentInventory
            }
        });
        return await modal.present();
    }
}
