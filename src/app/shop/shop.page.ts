import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {
    Inventory,
    InventoryControllerServiceService,
    User,
    TypeControllerServiceService,
    Type,
    ProductFeatureControllerServiceService, ProductFeature
} from '../_dal/ipohdrum';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.page.html',
    styleUrls: ['./shop.page.scss'],
})

export class ShopPage implements OnInit {

    keywordToSearchItems = '';

    isLoadingSpecialDealsItemList = true;

    listOfCategories: Array<Type> = [];
    listOfProductFeatures: Array<ProductFeature> = [];
    specialDealsItemList: Array<any> = [];
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
        private productFeatureControllerService: ProductFeatureControllerServiceService
    ) {}

    ngOnInit() {
        this.ngZone.run(() => {
            // Get list of categories
            this.getListOfCategories();

            // Get list of product features
            this.getListOfProductFeatures();

            // Get list of Inventories based on the product feature

        });
    }

    ionViewWillLeave() {
        if (this.inventorySubscription) {
            this.inventorySubscription.unsubscribe();
        }
        if (this.typeSubscription) {
            this.typeSubscription.unsubscribe();
        }
        if (this.productFeaturesSubscription) {
            this.productFeaturesSubscription.unsubscribe();
        }
    }

    getListOfCategories() {
        this.typeSubscription = this.typeControllerService.getTypeList().subscribe(resp => {
            if (resp.code === 200) {
                this.listOfCategories = resp.data;
            } else {
                // TODO: Show 'Unable to fetch categories' message
            }
        }, error => {
            console.log('api errorr on getting categories list(Type)');
        });
    }

    // tslint:disable-next-line:ban-types
    getListOfProductFeatures(callbackFunction?: Function) {
        this.productFeaturesSubscription = this.productFeatureControllerService.getProductFeatureList().subscribe(resp => {
            if (resp.code === 200) {
                this.listOfProductFeatures = resp.data;
                if (callbackFunction !== undefined) {
                    callbackFunction();
                }
            } else {
                // TODO: Show 'Unable to fetch Features' message
            }
        }, error => {
            console.log('api error on getting product feature list(ProductFeature)');
        });
    }

    getListOfInventoriesBasedOnProductFeatures() {

    }

    productDetail(inventoryUID: number) {
        this.router.navigate(['product-detail', inventoryUID], {relativeTo: this.route}).catch(reason => {
            console.log('Routing navigateion error, reason: ' + reason);
            // TODO: Navigate to home page
        });
    }

    searchItems() {
        console.log('search item:' + this.keywordToSearchItems);
    }

    showMoreSpecialDeals() {
        console.log('show special deals');
    }

    selectCategory(selectedCategoryUid: string) {
        console.log('selected ' + selectedCategoryUid);
    }
}
