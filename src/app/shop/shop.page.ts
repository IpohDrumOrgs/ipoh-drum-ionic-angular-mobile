import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {
    InventoryControllerServiceService,
    SliderControllerServiceService,
    TypeControllerServiceService,
    Type,
    ProductFeatureControllerServiceService, ProductFeature, Inventory
} from '../_dal/ipohdrum';
import {NavController, Platform} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalfunctionService} from '../_dal/common/services/globalfunction.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.page.html',
    styleUrls: ['./shop.page.scss'],
})

export class ShopPage implements OnInit, OnDestroy {

    constructorName = '[' + this.constructor.name + ']';

    isLoadingCategories = true;
    isLoadingProductFeaturesAndProductInventories = true;
    isLoadingSliders = true;

    listOfCategories: Array<Type> = [];
    productFeatureUids: Array<string> = [];
    productFeatureNames: Array<string> = [];
    listOfProductFeaturesAndItsInventories: Array<any> = [];
    imageObject: Array<object> = [
        {
            image: "https://res.cloudinary.com/ipoh-drum/image/upload/v1581001036/rsz_190810_24drums_zoom__174_edited_1_jypihu.jpg",
            thumbImage: "https://res.cloudinary.com/ipoh-drum/image/upload/v1581001036/rsz_190810_24drums_zoom__174_edited_1_jypihu.jpg",
            alt: '',
            title: '1'
        },
        {
            image: "https://res.cloudinary.com/ipoh-drum/image/upload/v1581001036/rsz_190810_24drums_zoom__174_edited_1_jypihu.jpg",
            thumbImage: "https://res.cloudinary.com/ipoh-drum/image/upload/v1581001036/rsz_190810_24drums_zoom__174_edited_1_jypihu.jpg",
            alt: '',
            title: '2'
        },
        {
            image: "https://res.cloudinary.com/ipoh-drum/image/upload/v1581001036/rsz_190810_24drums_zoom__174_edited_1_jypihu.jpg",
            thumbImage: "https://res.cloudinary.com/ipoh-drum/image/upload/v1581001036/rsz_190810_24drums_zoom__174_edited_1_jypihu.jpg",
            alt: '',
            title: '3'
        },
        {
            image: "https://res.cloudinary.com/ipoh-drum/image/upload/v1581001036/rsz_190810_24drums_zoom__174_edited_1_jypihu.jpg",
            thumbImage: "https://res.cloudinary.com/ipoh-drum/image/upload/v1581001036/rsz_190810_24drums_zoom__174_edited_1_jypihu.jpg",
            alt: '',
            title: '4'
        },
    ];
    referInfiniteScroll: any;

    inventorySubscription: any;
    typeSubscription: any;
    sliderSubscription: any;
    productFeaturesSubscription: any;
    subscription: any;

    constructor(
        private inventoryControllerService: InventoryControllerServiceService,
        private ngZone: NgZone,
        private ref: ChangeDetectorRef,
        private navController: NavController,
        private router: Router,
        private route: ActivatedRoute,
        private sliderControllerService: SliderControllerServiceService,
        private typeControllerService: TypeControllerServiceService,
        private productFeatureControllerService: ProductFeatureControllerServiceService,
        private globalFunctionService: GlobalfunctionService,
        private platform: Platform
    ) {}


    ngOnInit() {
        this.ngZone.run(() => {
            // this.getListOfCategories();
            this.getListOfProductFeatures();
            this.getListOfSliders();
            
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
            if (this.inventorySubscription) {
                this.inventorySubscription.unsubscribe();
            }
            if (this.typeSubscription) {
                this.typeSubscription.unsubscribe();
            }
            if (this.sliderSubscription) {
                this.sliderSubscription.unsubscribe();
            }
            if (this.productFeaturesSubscription) {
                this.productFeaturesSubscription.unsubscribe();
            }
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

    getListOfSliders() {
        this.isLoadingSliders = true;
        if (this.sliderSubscription) {
            this.sliderSubscription.unsubscribe();
        }
        this.sliderSubscription = this.sliderControllerService.getPublicSliders().subscribe(resp => {
            if (resp.code === 200) {
                //Assign Sliders Image Link To image Object
                console.log(resp.data);
                
                this.imageObject = resp.data;
            } else {
                this.showPromptAlertWarning();
            }
            this.isLoadingSliders = false;
        }, error => {
            this.isLoadingSliders = false;
            this.showPromptAlertWarning();
        });
    }

    getListOfCategories() {
        this.isLoadingCategories = true;
        if (this.typeSubscription) {
            this.typeSubscription.unsubscribe();
        }
        this.typeSubscription = this.typeControllerService.getTypes().subscribe(resp => {
            if (resp.code === 200) {
                this.listOfCategories = resp.data;
            } else {
                this.showPromptAlertWarning();
            }
            this.isLoadingCategories = false;
        }, error => {
            this.isLoadingCategories = false;
            this.showPromptAlertWarning();
        });
    }

    getListOfProductFeatures() {
        this.productFeatureUids = [];
        this.productFeatureNames = [];
        this.listOfProductFeaturesAndItsInventories = [];
        this.isLoadingProductFeaturesAndProductInventories = true;
        if (this.productFeaturesSubscription) {
            this.productFeaturesSubscription.unsubscribe();
        }
        this.productFeaturesSubscription = this.productFeatureControllerService.getProductFeatures().subscribe(resp => {
            if (resp.code === 200) {
                resp.data.forEach((prodFeatureObj) => {
                    this.productFeatureUids.push(prodFeatureObj.uid);
                    this.productFeatureNames.push(prodFeatureObj.name);
                });
                this.getListOfInventoriesBasedOnProductFeatures();
            } else {
                this.showPromptAlertWarning();
            }
        }, error => {
            this.showPromptAlertWarning();
        });
    }

    getListOfInventoriesBasedOnProductFeatures() {
        for (let i = 0; i < this.productFeatureUids.length; i++) {
            setTimeout(() => {
                this.productFeatureControllerService.getFeaturedProductListByUid(
                    this.productFeatureUids[i],
                    1,
                    6
                ).subscribe(resp => {
                    if (resp.code === 200) {
                        this.listOfProductFeaturesAndItsInventories.push({
                            productFeatureUid: this.productFeatureUids[i],
                            productFeatureName: this.productFeatureNames[i],
                            inventories: resp.data
                        });
                    } else {
                        this.listOfProductFeaturesAndItsInventories.push({
                            productFeatureUid: this.productFeatureUids[i],
                            productFeatureName: this.productFeatureNames[i],
                            inventories: []
                        });
                    }
                }, error => {
                });
            }, 500);
        }
        this.isLoadingProductFeaturesAndProductInventories = false;
    }

    viewProductDetail(inventoryUID: string) {
        inventoryUID += '&1';
        this.router.navigate(['product-detail', inventoryUID], {relativeTo: this.route}).catch(reason => {
            // tslint:disable-next-line:max-line-length
            this.globalFunctionService.simpleToast('ERROR', 'Unable to view Inventory\'s details, please try again later.', 'warning', 'top');
            this.router.navigate(['/home']);
        });
    }

    showPromptAlertWarning() {
        this.globalFunctionService.presentAlertConfirm('Error!',
            'Oops, something went wrong, please try again later!',
            'Cancel', 'Ok',
            undefined, undefined);
    }

    showMore(productFeatureUid: string) {
        this.router.navigate(['show-more-products', productFeatureUid], {relativeTo: this.route}).catch(reason => {
            // tslint:disable-next-line:max-line-length
            this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve list of Inventories, please try again later.', 'warning', 'top');
            this.router.navigate(['/ipoh-drum/home']);
        });
    }

    ionRefresh(event) {
        if (this.referInfiniteScroll) {
            this.referInfiniteScroll.target.disabled = false;
        }
        this.getListOfProductFeatures();
        setTimeout(() => {
            event.target.complete();
        }, 500);
    }

    searchInventoryClicked() {
        this.router.navigate(['ipoh-drum/shop/search-inventory']).catch(reason => {
            this.globalFunctionService.simpleToast('ERROR', 'Something went wrong, please try again later!', 'danger');
        });
    }

    /*    // TODO
        selectCategory(selectedCategoryUid: string) {
            console.log('selected ' + selectedCategoryUid);
        }*/
}
