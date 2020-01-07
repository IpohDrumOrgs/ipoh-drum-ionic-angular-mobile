import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Inventory, ProductFeatureControllerServiceService} from '../../_dal/ipohdrum';
import {ModalController} from '@ionic/angular';
import {LoadingService} from '../../_dal/common/services/loading.service';
import {GlobalfunctionService} from '../../_dal/common/services/globalfunction.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {commonConfig} from '../../_dal/common/commonConfig';

@Component({
  selector: 'app-show-more-products',
  templateUrl: './show-more-products.page.html',
  styleUrls: ['./show-more-products.page.scss'],
})

export class ShowMoreProductsPage implements OnInit, OnDestroy {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  productFeatureUid: string;

  // Numbers
  currentPageNumber = 1;
  currentPageSize = commonConfig.currentPageSize;
  maximumPages: number;
  totalResult: number;

  // Boolean
  isLoadingListOfInventoriesByProductFeatureUid = true;

  // Arrays
  listOfProductsByProductFeatureUid: Array<Inventory> = [];

  // Objects
  referInfiniteScroll: any;

  // Subscriptions
  getListOfProductsByProductFeatureUidSubscription: any;
  appendListOfProductsByProductFeatureUidSubscription: any;

  constructor(
      private location: Location,
      private router: Router,
      private route: ActivatedRoute,
      private ngZone: NgZone,
      private modalController: ModalController,
      private loadingService: LoadingService,
      private globalFunctionService: GlobalfunctionService,
      private productFeatureControllerService: ProductFeatureControllerServiceService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.retrieveListOfInventoriesByProductFeatureUid();
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
      if (this.getListOfProductsByProductFeatureUidSubscription) {
        this.getListOfProductsByProductFeatureUidSubscription.unsubscribe();
      }
    });
  }

  retrieveListOfInventoriesByProductFeatureUid() {
    this.isLoadingListOfInventoriesByProductFeatureUid = true;
    this.route.params.subscribe(params => {
      this.productFeatureUid = params.uid;
      if (this.getListOfProductsByProductFeatureUidSubscription) {
        this.getListOfProductsByProductFeatureUidSubscription.unsubscribe();
      }
      this.getListOfProductsByProductFeatureUidSubscription = this.productFeatureControllerService.getFeaturedProductListByUid(
          this.productFeatureUid,
          this.currentPageNumber,
          this.currentPageSize
      ).subscribe(resp => {
        console.log(resp);
        if (resp.code === 200) {
          this.listOfProductsByProductFeatureUid = resp.data;
          this.maximumPages = resp.maximumPages;
          this.totalResult = resp.totalResult;
        } else {
          this.listOfProductsByProductFeatureUid = [];
          this.maximumPages = 0;
          this.totalResult = 0;
        }
        this.isLoadingListOfInventoriesByProductFeatureUid = false;
      }, error => {
        console.log('API Error while retrieving list of products by product feature uid.');
        this.isLoadingListOfInventoriesByProductFeatureUid = false;
      });
    });
  }

  backToShopPage() {
    this.location.back();
  }

  loadMoreInventories(event) {
    this.referInfiniteScroll = event;
    setTimeout(() => {
      if (this.maximumPages > this.currentPageNumber) {
        this.currentPageNumber++;
        this.appendListOfProductsByProductFeatureUidSubscription = this.productFeatureControllerService.getFeaturedProductListByUid(
            this.productFeatureUid,
            this.currentPageNumber,
            this.currentPageSize
        ).subscribe(resp => {
          if (resp.code === 200) {
            for (const tempInventories of resp.data) {
              this.listOfProductsByProductFeatureUid.push(tempInventories);
            }
          }
          this.referInfiniteScroll.target.complete();
        }, error => {
          console.log('API Error while retrieving list of inventories by product feature uid.');
          this.referInfiniteScroll.target.complete();
        });
      }
      if (this.totalResult === this.listOfProductsByProductFeatureUid.length) {
        this.referInfiniteScroll.target.disabled = true;
      }
    }, 500);
  }

  viewProductDetail(inventoryUID: string) {
    this.router.navigate(['ipoh-drum/shop/product-detail', inventoryUID]).catch(reason => {
      console.log('Routing navigation failed');
      // tslint:disable-next-line:max-line-length
      this.globalFunctionService.simpleToast('ERROR', 'Unable to view Inventory\'s details, please try again later.', 'warning', 'top');
      this.router.navigate(['/home']);
    });
  }
}
