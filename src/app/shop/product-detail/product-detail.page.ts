import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Inventory, InventoryControllerServiceService} from '../../_dal/ipohdrum';
import {ProductVariationModalPage} from './product-variation-modal/product-variation-modal.page';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.page.html',
    styleUrls: ['./product-detail.page.scss'],
})

export class ProductDetailPage implements OnInit, OnDestroy {

    constructorName = '[' + this.constructor.name + ']';

    inventoryUID: number;

    isLoadingInventory = true;
    isAddingProductToCart = false;

    currentInventory: Inventory;
    dataReturned:any;

    currentInventorySubscription: any;

    ionSliderOptions = {
        autoHeight: true,
        initialSlide: 0,
        speed: 400
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private ngZone: NgZone,
        private modalController: ModalController,
        private inventoryControllerService: InventoryControllerServiceService
    ) {
        console.log(this.constructorName + 'Initializing component');
    }

    ngOnInit() {
        this.isLoadingInventory = true;
        this.route.params.subscribe(params => {
            this.inventoryUID = +params.uid;
            this.currentInventorySubscription = this.inventoryControllerService.getOnSaleInventoryByUid(
                this.inventoryUID.toString()
            ).subscribe(resp => {
                if (resp.code === 200) {
                    console.log('got the item: ' + this.inventoryUID);
                    console.log(resp);
                    this.currentInventory = resp.data;
                } else {
                    // TODO: Navigate to Shop page after showed alert prompt
                }
                this.isLoadingInventory = false;
            }, error => {
                console.log('cannot get item');
                this.isLoadingInventory = false;
                // TODO: Navigate to Shop page after showed alert prompt
            });
        });
    }

    ngOnDestroy() {
        this.ngZone.run(() => {
            if (this.currentInventorySubscription) {
                console.log(this.constructorName + 'Unsubscribed currentInventorySubscription');
                this.currentInventorySubscription.unsubscribe();
            }
        });
    }

    ionViewWillLeave() {
        this.ngZone.run(() => {
            if (this.currentInventorySubscription) {
                console.log(this.constructorName + 'Unsubscribed currentInventorySubscription');
                this.currentInventorySubscription.unsubscribe();
            }
        });
    }

    backToShopPage() {
        this.router.navigate(['ipoh-drum/shop']).catch(reason => {
            console.log('Routing error, reason:', reason);
            // TODO: Navigate to home page after showed alert prompt
        });
    }

    addProductToCart() {
        console.log('add product to cart');
        this.ngZone.run(() => {
           this.isAddingProductToCart = true;
        });
    }

    async openModal() {
        const modal = await this.modalController.create({
            component: ProductVariationModalPage,
            cssClass: 'dialog-modal',
            componentProps: {
                selectedInventory: this.currentInventory
            }
        });

        modal.onDidDismiss().then((dataReturned) => {
            if (dataReturned !== null) {
                this.dataReturned = dataReturned.data;
                console.log(this.dataReturned);
                // alert('Modal Sent Data :'+ dataReturned);
            }
        });
        return await modal.present();
    }
}
