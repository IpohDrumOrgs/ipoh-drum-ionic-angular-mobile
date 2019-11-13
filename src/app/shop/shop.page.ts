import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {InventoryControllerServiceService} from '../_dal/ipohdrum';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.page.html',
    styleUrls: ['./shop.page.scss'],
})

export class ShopPage implements OnInit, OnDestroy {

    keywordToSearchItems = '';

    isLoadingSpecialDealsItemList = true;

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
            image: 'assets/images/maxresdefault.jpg',
            thumbImage: 'assets/images/maxresdefault.jpg',
            alt: 'puppy alt of image',
            title: 'Puppy'
        }
    ];

    inventorySubscription: any;

    constructor(
        private inventoryControllerService: InventoryControllerServiceService,
        private ngZone: NgZone,
        private ref: ChangeDetectorRef,
        private navController: NavController,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.ngZone.run(() => {
            this.isLoadingSpecialDealsItemList = true;
            this.inventorySubscription = this.inventoryControllerService.getInventoryList(
                1,
                6
            ).subscribe(resp => {
                if (resp.code === 200) {
                    console.log('got inventory');
                    console.log(resp);
                    this.specialDealsItemList = resp.data;
                } else {
                    console.log('cannot get inventory list');
                }
                this.isLoadingSpecialDealsItemList = false;
            }, error => {
                console.log('cannot get inventory list due to api error');
                this.isLoadingSpecialDealsItemList = false;
            });
        });
    }

    ngOnDestroy() {
        this.ngZone.run(() => {
           if (this.inventorySubscription) {
               this.inventorySubscription.unsubscribe();
           }
        });
    }

    searchItems() {
        console.log('search item:' + this.keywordToSearchItems);
    }

    productDetail(inventoryUID: number) {
        console.log('product detail: ' + inventoryUID);
        this.router.navigate(['product-detail', inventoryUID], {relativeTo: this.route}).catch(reason => {
            console.log('Routing navigateion error, reason: ' + reason);
        });
    }

    showMoreSpecialDeals() {
        console.log('show special deals');
    }
}
