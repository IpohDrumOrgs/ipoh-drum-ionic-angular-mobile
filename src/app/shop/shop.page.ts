import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {
    InventoryControllerServiceService,
    TypeControllerServiceService,
    Type,
    ProductFeatureControllerServiceService, ProductFeature, Inventory
} from '../_dal/ipohdrum';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalfunctionService} from '../_dal/common/services/globalfunction.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.page.html',
    styleUrls: ['./shop.page.scss'],
})

export class ShopPage implements OnInit, OnDestroy {

    imageObject: Array<object> = [
        {
            image: 'assets/images/ekko.jpg',
            thumbImage: 'assets/images/ekko.jpg',
            alt: 'ekko alt of image',
            title: 'Ekko'
        },
        {
            image: 'assets/images/deku.jpeg',
            thumbImage: 'assets/images/deku.jpeg',
            alt: 'deku alt of image',
            title: 'Deku'
        },
        {
            image: 'assets/images/kitty.jpg',
            thumbImage: 'assets/images/kitty.jpg',
            alt: 'kitty alt of image',
            title: 'Kitty'
        }
    ];

    constructorName = '[' + this.constructor.name + ']';
    keywordToSearchItems = '';

    isLoadingCategories = true;
    isLoadingProductFeaturesAndProductInventories = true;

    // Sports, Musical, Clothing, Games
    listOfCategories: Array<Type> = [];
    // Recommended, Flash Sales, Hot Deals
    listOfProductFeatures: Array<ProductFeature> = [];
    // List of Inventory for each "ProductFeature"
    listOfProducts: Array<Inventory> = [];

    inventorySubscription: any;
    typeSubscription: any;
    productFeaturesSubscription: any;

    constructor(
        private inventoryControllerService: InventoryControllerServiceService,
        private ngZone: NgZone,
        private ref: ChangeDetectorRef,
        private navController: NavController,
        private router: Router,
        private route: ActivatedRoute,
        private typeControllerService: TypeControllerServiceService,
        private productFeatureControllerService: ProductFeatureControllerServiceService,
        private globalFunctionService: GlobalfunctionService
    ) {
        console.log(this.constructorName + 'Initializing component');
    }

    ngOnInit() {
        this.ngZone.run(() => {
            this.getListOfCategories();
            this.getListOfProductFeatures();
        });
    }

    ngOnDestroy() {
        this.unsubscribeSubscriptions();
    }

    ionViewDidLeave() {
        this.unsubscribeSubscriptions()
    }

    unsubscribeSubscriptions() {
        this.ngZone.run(() => {
            if (this.inventorySubscription) {
                this.inventorySubscription.unsubscribe();
            }
            if (this.typeSubscription) {
                this.typeSubscription.unsubscribe();
            }
            if (this.productFeaturesSubscription) {
                this.productFeaturesSubscription.unsubscribe();
            }
        });
    }

    getListOfCategories() {
        this.isLoadingCategories = true;
        this.typeSubscription = this.typeControllerService.getTypes().subscribe(resp => {
            if (resp.code === 200) {
                this.listOfCategories = resp.data;
            } else {
                this.showPromptAlertWarning();
            }
            this.isLoadingCategories = false;
        }, error => {
            console.log('API error while retrieving list of Categories');
            this.isLoadingCategories = false;
            this.showPromptAlertWarning();
        });
    }

    getListOfProductFeatures() {
        this.isLoadingProductFeaturesAndProductInventories = true;
        this.productFeaturesSubscription = this.productFeatureControllerService.getProductFeatures().subscribe(resp => {
            if (resp.code === 200) {
                this.listOfProductFeatures = resp.data;
                this.listOfProductFeatures.forEach((prodFeatureObj) => {
                    this.getListOfInventoriesBasedOnProductFeatures(prodFeatureObj.uid);
                });
            } else {
                this.listOfProductFeatures = null;
                this.showPromptAlertWarning();
            }
        }, error => {
            console.log('API error while retrieving ProductFeature list.');
            this.showPromptAlertWarning();
        });
    }

    getListOfInventoriesBasedOnProductFeatures(prodFeatureUid: string) {
        this.productFeatureControllerService.getFeaturedProductListByUid(
            prodFeatureUid,
            1,
            6
        ).subscribe(resp => {
            console.log(resp);
            if (resp.code === 200) {
                this.listOfProducts.push(resp.data);
                console.log(this.listOfProducts);
            } else {
                this.listOfProducts.push(null);
            }
            this.isLoadingProductFeaturesAndProductInventories = false;
        }, error => {
            console.log('API error while retrieving Inventories based on ProductFeature UID');
            this.isLoadingProductFeaturesAndProductInventories = false;
            this.showPromptAlertWarning();
        });
    }

    viewProductDetail(inventoryUID: number) {
        this.router.navigate(['product-detail', inventoryUID], {relativeTo: this.route}).catch(reason => {
            console.log('Routing navigation failed');
            this.globalFunctionService.simpleToast('ERROR', 'Unable to view Product\'s details, please try again later.', 'warning', 'top');
            this.router.navigate(['/home']);
        });
    }

    showPromptAlertWarning() {
        this.globalFunctionService.presentAlertConfirm('Error!',
            'Oops, something went wrong, please try again later!',
            'Cancel', 'Ok',
            undefined, undefined);
    }

    // TODO
    showMore(productFeatureUid: string) {
        console.log('show more items from product feature of uid:' + productFeatureUid);
    }

    // TODO
    selectCategory(selectedCategoryUid: string) {
        console.log('selected ' + selectedCategoryUid);
    }
}
