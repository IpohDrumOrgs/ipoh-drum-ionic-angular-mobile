import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {commonConfig} from '../../_dal/common/commonConfig';
import {Inventory, InventoryControllerServiceService} from '../../_dal/ipohdrum';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {GlobalfunctionService} from '../../_dal/common/services/globalfunction.service';

@Component({
  selector: 'app-search-inventory',
  templateUrl: './search-inventory.page.html',
  styleUrls: ['./search-inventory.page.scss'],
})

export class SearchInventoryPage implements OnInit, OnDestroy {

  constructorName = '[' + this.constructor.name + ']';
  searchedKeyword: string;

  currentPageNumber = 1;
  currentPageSize = commonConfig.currentPageSize;
  maximumPages: number;
  totalResult: number;

  showLoadingSpinner = false;

  listOfInventoriesByKeyword: Array<Inventory> = [];

  referInfiniteScroll: any;

  getListOfInventoriesByKeywordSubscription: any;
  appendListOfInventoriesByKeywordSubscription: any;
  backButtonSubscription: any;

  constructor(
      private ngZone: NgZone,
      private router: Router,
      private platform: Platform,
      private inventoryControllerService: InventoryControllerServiceService,
      private globalFunctionService: GlobalfunctionService
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribeSubscriptions();
  }

  ionViewDidLeave() {
    this.unsubscribeSubscriptions();
  }

  unsubscribeSubscriptions() {
    this.ngZone.run(() => {
      if (this.getListOfInventoriesByKeywordSubscription) {
        this.getListOfInventoriesByKeywordSubscription.unsubscribe();
      }
      if (this.appendListOfInventoriesByKeywordSubscription) {
        this.appendListOfInventoriesByKeywordSubscription.unsubscribe();
      }
    });
  }

  ionViewDidEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.router.navigate(['ipoh-drum/shop']).catch(reason => {
        this.globalFunctionService.simpleToast('ERROR', 'Something went wrong, please try again later!', 'danger');
      });
    });
  }

  ionViewWillLeave() {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  searchKeywordInput() {
    this.showLoadingSpinner = true;
  }

  searchKeywordChange() {
    if (this.searchedKeyword && this.searchedKeyword !== '') {
      setTimeout(() => {
        this.retrieveListOfInventoriesByKeyword();
      }, 500);
    } else {
      this.showLoadingSpinner = false;
      this.resetSearchResults();
    }
  }

  retrieveListOfInventoriesByKeyword() {
    if (this.getListOfInventoriesByKeywordSubscription) {
      this.getListOfInventoriesByKeywordSubscription.unsubscribe();
    }
    this.currentPageNumber = 1;
    this.getListOfInventoriesByKeywordSubscription = this.inventoryControllerService.filterOnSaleInventories(
        this.currentPageNumber,
        this.currentPageSize,
        this.searchedKeyword,
        null,
        null,
        'true'
    ).subscribe(resp => {
      if (resp.code === 200) {
          this.listOfInventoriesByKeyword = resp.data;
          this.maximumPages = resp.maximumPages;
          this.totalResult = resp.totalResult;
      } else {
        this.resetSearchResults();
      }
      this.showLoadingSpinner = false;
    }, error => {
      this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve Inventories by keyword, please try again later!', 'danger');
      this.showLoadingSpinner = false;
      this.resetSearchResults();
    });
  }

  resetSearchResults() {
    this.listOfInventoriesByKeyword = [];
    this.maximumPages = 0;
    this.totalResult = 0;
    if (this.referInfiniteScroll) {
      this.referInfiniteScroll.target.disabled = false;
    }
  }

  loadMoreInventoriesByKeyword(event) {
    this.referInfiniteScroll = event;
    setTimeout(() => {
      if (this.maximumPages > this.currentPageNumber) {
        this.currentPageNumber++;
        this.appendListOfInventoriesByKeywordSubscription = this.inventoryControllerService.filterOnSaleInventories(
            this.currentPageNumber,
            this.currentPageSize,
            this.searchedKeyword,
            null,
            null,
            'true'
        ).subscribe(resp => {
          if (resp.code === 200) {
            for (const tempInventory of resp.data) {
              this.listOfInventoriesByKeyword.push(tempInventory);
            }
          }
          this.referInfiniteScroll.target.complete();
        }, error => {
          this.referInfiniteScroll.target.complete();
        });
      }
      if (this.totalResult === this.listOfInventoriesByKeyword.length) {
        this.referInfiniteScroll.target.disabled = true;
      }
    }, 500);
  }

  viewProductDetail(inventoryUID: string) {
    inventoryUID += '&2';
    this.router.navigate(['ipoh-drum/shop/product-detail', inventoryUID]).catch(reason => {
      // tslint:disable-next-line:max-line-length
      this.globalFunctionService.simpleToast('ERROR', 'Unable to view Inventory\'s details, please try again later.', 'warning', 'top');
      this.router.navigate(['/home']);
    });
  }
}
