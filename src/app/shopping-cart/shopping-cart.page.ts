import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';
import {GlobalfunctionService} from '../_dal/common/services/globalfunction.service';
import {commonConfig} from '../_dal/common/commonConfig';
import {LoadingService} from '../_dal/common/services/loading.service';
import {ModalController, Platform} from '@ionic/angular';
import {PaymentInfoModalPage} from '../shared/payment-info-modal/payment-info-modal.page';
import {Stripe} from '@ionic-native/stripe/ngx';
import {AuthenticationService} from '../_dal/common/services/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.page.html',
    styleUrls: ['./shopping-cart.page.scss'],
})

export class ShoppingCartPage implements OnInit {

    // Strings
    constructorName = '[' + this.constructor.name + ']';

    // Numbers
    nullSelectedInventoryPatternId = commonConfig.nullSelectedInventoryPatternId;
    totalPriceInCart = 0;

    // Arrays
    listOfInventoriesInCart: Array<any> = [];
    selectedInventoryStoreIds: Array<number> = [];
    uniqueSelectedInventoryStoreIds: Array<number> = [];
    finalSaleInventory: Array<any> = [];
    eachItemPriceToPay: Array<number> = [];

    // Subscriptions
    inventoriesInCartSubscription: any;
    subscription: any;

    constructor(
        private stripe: Stripe,
        private ngZone: NgZone,
        private router: Router,
        private sharedService: SharedService,
        private loadingService: LoadingService,
        private modalController: ModalController,
        private authenticationService: AuthenticationService,
        private globalFunctionService: GlobalfunctionService,
        private platform: Platform
    ) {
        this.listOfInventoriesInCart = this.sharedService.returnSelectedInventoriesInCart();
        this.countTotalPriceToPay();
    }

    ngOnInit() {
        this.ngZone.run(() => {
            this.inventoriesInCartSubscription = this.sharedService.emitSelectedInventoryToCart$.subscribe(data => {
                this.listOfInventoriesInCart = data;
                this.countTotalPriceToPay();
            });
        });
    }

    ionViewDidEnter() {
        this.subscription = this.platform.backButton.subscribe(() => {
            this.globalFunctionService.presentAlertConfirm(
                'WARNING',
                'Are you sure you want to exit the app?',
                'Cancel',
                'Exit',
                undefined,
                () => this.methodToExitApp()
            );
        });
    }

    methodToExitApp() {
        navigator['app'].exitApp();
    }

    ionViewWillLeave() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    clearShoppingCart() {
        this.globalFunctionService.presentAlertConfirm(
            'Clear Cart',
            'Are you sure you want to clear your shopping cart?',
            'Cancel',
            'Yes',
            undefined,
            () => this.actuallyClearShoppingCart());
    }

    actuallyClearShoppingCart() {
        this.sharedService.clearShoppingCart();
    }

    increaseInventoryQuantity(inventoryInCart: any) {
        if (inventoryInCart.qty > inventoryInCart.selectedQuantity) {
            inventoryInCart.selectedQuantity++;
            this.countTotalPriceToPay();
        }
    }

    reduceInventoryQuantity(inventoryInCart: any, indexInCart: number) {
        if (inventoryInCart.selectedQuantity > 1) {
            inventoryInCart.selectedQuantity--;
        } else {
            this.globalFunctionService.presentAlertConfirm(
                'Remove From Cart',
                'Are you sure you want to remove the item from your cart?',
                'Cancel',
                'Yes',
                undefined,
                () => this.removeInventoryFromCart(inventoryInCart, indexInCart));
        }
        this.countTotalPriceToPay();
    }

    removeInventoryFromCart(inventory: any, indexInCart: number) {
        this.sharedService.removeSpecificInventoryFromCart(inventory, indexInCart);
    }

    checkout() {
        if (this.authenticationService.isUserLoggedIn()) {
            this.loadingService.present();
            setTimeout(() => {
                this.selectedInventoryStoreIds = [];
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < this.listOfInventoriesInCart.length; i++) {
                    // Get all the store ids of the selected inventories
                    this.selectedInventoryStoreIds.push(this.listOfInventoriesInCart[i].store.id);
                }
                // Copy the list of unique store ids into this array
                this.uniqueSelectedInventoryStoreIds = Object.assign([], Array.from(new Set(this.selectedInventoryStoreIds)));
                this.finalSaleInventory = [];
                // Hold current unique store id
                // tslint:disable-next-line:prefer-for-of
                for (let j = 0; j < this.uniqueSelectedInventoryStoreIds.length; j++) {
                    const saleItems = [];
                    let inven = {};
                    // Loop through each inventory
                    // tslint:disable-next-line:prefer-for-of
                    for (let k = 0; k < this.listOfInventoriesInCart.length; k++) {
                        if (this.uniqueSelectedInventoryStoreIds[j] === this.listOfInventoriesInCart[k].store.id) {
                            let invenFam = {};
                            let invenPattern = {};
                            if (this.listOfInventoriesInCart[k].selectedInventoryPattern.id !== 9999) {
                                invenPattern = {
                                    pattern_id: this.listOfInventoriesInCart[k].selectedInventoryPattern.id,
                                    type: 'pattern',
                                    qty: this.listOfInventoriesInCart[k].selectedQuantity
                                };
                                saleItems.push(invenPattern);
                            } else {
                                invenFam = {
                                    inventory_family_id: this.listOfInventoriesInCart[k].selectedInventoryFamily.id,
                                    type: 'inventoryfamily',
                                    qty: this.listOfInventoriesInCart[k].selectedQuantity
                                };
                                saleItems.push(invenFam);
                            }
                        }
                    }
                    // Store Id
                    inven = {
                        store_id: this.uniqueSelectedInventoryStoreIds[j],
                        saleitems: saleItems
                    };
                    this.finalSaleInventory.push(inven);
                }
                this.countTotalPriceToPay();
                this.openPaymentInfoModal();
                this.loadingService.dismiss();
            }, 500);
        } else {
            this.globalFunctionService.presentAlertConfirm(
                'WARNING',
                'Please login first before proceeding to make any transaction-related actions.',
                'Cancel',
                'Login',
                undefined,
                () => this.actuallyRouteToLoginPage()
            );
        }
    }

    countTotalPriceToPay() {
        this.eachItemPriceToPay = [];
        this.totalPriceInCart = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let c = 0 ; c < this.listOfInventoriesInCart.length ; c++) {
            if (this.listOfInventoriesInCart[c].promotion) {
                // If select only InventoryFamily
                if (this.listOfInventoriesInCart[c].selectedInventoryPattern.id === 9999) {
                    // If discount by price
                    if (this.listOfInventoriesInCart[c].promotion.discbyprice === 1) {
                        // tslint:disable-next-line:max-line-length
                        this.eachItemPriceToPay.push((this.listOfInventoriesInCart[c].selectedInventoryFamily.price - this.listOfInventoriesInCart[c].promotion.disc) * this.listOfInventoriesInCart[c].selectedQuantity);
                    } else {
                        // If discount by percentage
                        // tslint:disable-next-line:max-line-length
                        this.eachItemPriceToPay.push((this.listOfInventoriesInCart[c].selectedInventoryFamily.price - (this.listOfInventoriesInCart[c].selectedInventoryFamily.price * (this.listOfInventoriesInCart[c].promotion.discpctg / 100))) * this.listOfInventoriesInCart[c].selectedQuantity);
                    }
                } else {
                    // If select InventoryPattern
                    // If discount by price
                    if (this.listOfInventoriesInCart[c].promotion.discbyprice === 1) {
                        // tslint:disable-next-line:max-line-length
                        this.eachItemPriceToPay.push((this.listOfInventoriesInCart[c].selectedInventoryPattern.price - this.listOfInventoriesInCart[c].promotion.disc) * this.listOfInventoriesInCart[c].selectedQuantity);
                    } else {
                        // tslint:disable-next-line:max-line-length
                        this.eachItemPriceToPay.push((this.listOfInventoriesInCart[c].selectedInventoryPattern.price - (this.listOfInventoriesInCart[c].selectedInventoryPattern.price * (this.listOfInventoriesInCart[c].promotion.discpctg / 100))) * this.listOfInventoriesInCart[c].selectedQuantity);
                    }
                }
            } else {
                // If no promotion
                // If selects only family
                if (this.listOfInventoriesInCart[c].selectedInventoryPattern.id === 9999) {
                    this.eachItemPriceToPay.push(this.listOfInventoriesInCart[c].selectedInventoryPattern.price);
                } else {
                    this.eachItemPriceToPay.push(this.listOfInventoriesInCart[c].selectedInventoryFamily.price);
                }
            }
        }
        for (let d = 0 ; d < this.eachItemPriceToPay.length ; d++) {
            this.totalPriceInCart += this.eachItemPriceToPay[d];
        }
    }

    actuallyRouteToLoginPage() {
        this.router.navigate(['login']);
    }

    async openPaymentInfoModal() {
        const modal = await this.modalController.create({
            component: PaymentInfoModalPage,
            cssClass: 'payment-info-modal',
            componentProps: {
                finalSaleInventory: this.finalSaleInventory,
                totalPriceInCart: this.totalPriceInCart,
                buyInventoryFlag: true,
                buyVideoFlag: false
            }
        });
        modal.onDidDismiss().then((returnFromSuccessfulPayment) => {
            if (returnFromSuccessfulPayment.data) {
                this.sharedService.clearShoppingCartWithoutToast();
            }
        });
        return await modal.present();
    }
}
