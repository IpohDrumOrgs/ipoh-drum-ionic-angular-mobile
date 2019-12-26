import {ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  Company,
  Inventory,
  InventoryControllerServiceService, InventoryFamily,
  ProductPromotion, ProductPromotionControllerServiceService,
  Shipping,
  StoreControllerServiceService,
  Warranty
} from '../../../_dal/ipohdrum';
import {LoadingService} from '../../../_dal/common/services/loading.service';
import {ModalController} from '@ionic/angular';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {commonConfig} from '../../../_dal/common/commonConfig';
import {InvFamilyPatternModalPage} from '../add-inventory/inv-family-pattern-modal/inv-family-pattern-modal.page';
import {EditInventoryFamiliesAndPatternsPage} from '../edit-inventory-families-and-patterns/edit-inventory-families-and-patterns.page';
import {IonicSelectableComponent} from 'ionic-selectable';

@Component({
  selector: 'app-inventory-details-modal',
  templateUrl: './inventory-details-modal.page.html',
  styleUrls: ['./inventory-details-modal.page.scss'],
})

export class InventoryDetailsModalPage implements OnInit, OnDestroy {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  defaultNoPlanSelectedStr = 'Default (None)';
  selectedInventoryUid: string;
  selectedStoreUid: string;

  // Regex
  priceRegex = new RegExp(/^\d+(\.\d{2})?$/);
  numericOnlyRegex = commonConfig.numericOnlyRegex;

  // Booleans
  isLoadingInventoryDetails = true;
  isLoadingPromotionInfo = true;
  isLoadingWarrantyInfo = true;
  isLoadingShippingInfo = true;

  // Numbers
  inventoryNameMinLength = 5;
  inventoryNameMaxLength = 50;
  inventoryCodeMinLength = 2;
  inventoryCodeMaxLength = 50;
  inventorySKUMinLength = 2;
  inventorySKUMaxLength = 30;
  inventoryDescMinLength = 5;
  inventoryDescMaxLength = 50;
  inventoryCostMaxLength = 10;
  inventorySellingPriceMaxLength = 10;
  inventoryStockThresholdMaxLength = 3;
  selectedStoreId: number;

  // Promotions related numbers
  currentPageSize = 10;
  currentPromotionPageNumber = 1;
  promotionMaxPages: number;
  promotionTotalResults: number;

  // Objects
  selectedInventory: Inventory;
  defaultSelection = {
    id: null,
    desc: null,
    name: this.defaultNoPlanSelectedStr
  };
  selectedProductPromotionPlan: ProductPromotion;
  selectedWarrantyPlan: Warranty;
  selectedShippingPlan: Shipping;

  // Arrays
  listOfStorePromotions: ProductPromotion [] = [];
  listOfStoreWarranties: Warranty[] = [];
  listOfStoreShippings: Shipping[] = [];

  // ViewChild
  @ViewChild('inventoryThumbnailContainer', {static: false}) inventoryThumbnailContainer: ElementRef;
  @ViewChild('inventorySlidersContainer', {static: false}) inventorySlidersContainer: ElementRef;

  // FormGroups
  inventoryInfoFormGroup: FormGroup;

  // Subscriptions
  getInventoryDetailsSubscription: any;
  getListOfProductPromotionSubscription: any;
  getListOfWarrantySubscription: any;
  getListOfShippingSubscription: any;
  updateInventorySubscription: any;
  searchForListOfPromotionsSubscription: any;

  constructor(
      private ref: ChangeDetectorRef,
      private ngZone: NgZone,
      private loadingService: LoadingService,
      private modalController: ModalController,
      private globalFunctionService: GlobalfunctionService,
      private inventoryControllerService: InventoryControllerServiceService,
      private storeControllerService: StoreControllerServiceService,
      private productPromotionControllerService: ProductPromotionControllerServiceService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.inventoryInfoFormGroup = new FormGroup({
        inventoryName: new FormControl(null, [
          Validators.required,
          Validators.minLength(this.inventoryNameMinLength),
          Validators.maxLength(this.inventoryNameMaxLength)
        ]),
        inventoryCode: new FormControl(null, [
          Validators.required,
          Validators.minLength(this.inventoryCodeMinLength),
          Validators.maxLength(this.inventoryCodeMaxLength)
          // Validators.pattern(this.alphaNumericOnlyRegex)
        ]),
        inventorySKU: new FormControl(null, [
          Validators.required,
          Validators.minLength(this.inventorySKUMinLength),
          Validators.maxLength(this.inventorySKUMaxLength)
          // Validators.pattern(this.alphaNumericOnlyRegex)
        ]),
        inventoryDescription: new FormControl(null, [
          Validators.required,
          Validators.minLength(this.inventoryDescMinLength),
          Validators.maxLength(this.inventoryDescMaxLength)
        ]),
        inventoryCost: new FormControl(null, [
          Validators.required,
          Validators.maxLength(this.inventoryCostMaxLength),
          Validators.pattern(this.priceRegex)
        ]),
        inventoryBasePrice: new FormControl(null, [
          Validators.required,
          Validators.maxLength(this.inventorySellingPriceMaxLength),
          Validators.pattern(this.priceRegex)
        ]),
        inventoryStockThreshold: new FormControl(null, [
          Validators.required,
          Validators.maxLength(this.inventoryStockThresholdMaxLength),
          Validators.pattern(this.numericOnlyRegex)
        ])
      });
      this.ref.detectChanges();
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
      if (this.getInventoryDetailsSubscription) {
        this.getInventoryDetailsSubscription.unsubscribe();
      }
      if (this.getListOfProductPromotionSubscription) {
        this.getListOfProductPromotionSubscription.unsubscribe();
      }
      if (this.getListOfWarrantySubscription) {
        this.getListOfWarrantySubscription.unsubscribe();
      }
      if (this.getListOfShippingSubscription) {
        this.getListOfShippingSubscription.unsubscribe();
      }
      if (this.updateInventorySubscription) {
        this.updateInventorySubscription.unsubscribe();
      }
      if (this.searchForListOfPromotionsSubscription) {
        this.searchForListOfPromotionsSubscription.unsubscribe();
      }
    });
  }

  retrieveSelectedInventoryInfo() {
    this.loadingService.present();
    setTimeout(() => {
      this.isLoadingInventoryDetails = true;
      if (this.getInventoryDetailsSubscription) {
        this.getInventoryDetailsSubscription.unsubscribe();
      }
      this.getInventoryDetailsSubscription = this.inventoryControllerService.getInventoryByUid(
          this.selectedInventoryUid
      ).subscribe(resp => {
        if (resp.code === 200) {
          this.selectedInventory = resp.data;
          this.selectedProductPromotionPlan = this.selectedInventory.promotion;
          this.selectedInventory.promotion ? this.selectedProductPromotionPlan = this.selectedInventory.promotion
              : this.selectedProductPromotionPlan = this.defaultSelection;
          this.selectedInventory.warranty ? this.selectedWarrantyPlan = this.selectedInventory.warranty
              : this.selectedWarrantyPlan = this.defaultSelection;
          this.selectedInventory.shipping ? this.selectedShippingPlan = this.selectedInventory.shipping
              : this.selectedShippingPlan = this.defaultSelection;
        } else {
          // tslint:disable-next-line:max-line-length
          this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Inventory details, please try again later!', 'warning', 'top');
          this.closeInventoryDetailsModal(false);
        }

        // Callbacks
        this.retrieveListOfProductPromotions();
        this.retrieveListOfWarranties();
        this.retrieveListOfShippings();

        this.loadingService.dismiss();
        this.isLoadingInventoryDetails = false;
        this.ref.detectChanges();
      }, error => {
        console.log('API error unable to retrieve inventory details');
        console.log(error);
        this.loadingService.dismiss();
        this.isLoadingInventoryDetails = false;
        // tslint:disable-next-line:max-line-length
        this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Inventory details, please try again later!', 'warning', 'top');
        this.closeInventoryDetailsModal(false);
        this.ref.detectChanges();
      });
    }, 500);
  }

  retrieveListOfProductPromotions() {
    // this.loadingService.present();
    // setTimeout(() => {
    //   this.isLoadingPromotionInfo = true;
    //   if (this.getListOfProductPromotionSubscription) {
    //     this.getListOfProductPromotionSubscription.unsubscribe();
    //   }
    //   this.getListOfProductPromotionSubscription = this.storeControllerService.getPromotionsByStoreUid(
    //       this.selectedStoreUid
    //   ).subscribe(resp => {
    //     if (resp.code === 200) {
    //       this.listOfStorePromotions.push(this.defaultSelection);
    //       for (const tempPromo of resp.data) {
    //         this.listOfStorePromotions.push(tempPromo);
    //       }
    //     } else {
    //       this.listOfStorePromotions = [];
    //     }
    //     this.isLoadingPromotionInfo = false;
    //     this.ref.detectChanges();
    //   }, error => {
    //     this.listOfStorePromotions = [];
    //     this.isLoadingPromotionInfo = false;
    //     this.ref.detectChanges();
    //   });
    // }, 500);
  }

  retrieveListOfWarranties() {
    this.loadingService.present();
    setTimeout(() => {
      this.isLoadingWarrantyInfo = true;
      if (this.getListOfWarrantySubscription) {
        this.getListOfWarrantySubscription.unsubscribe();
      }
      this.getListOfWarrantySubscription = this.storeControllerService.getWarrantiesByStoreUid(
          this.selectedStoreUid
      ).subscribe(resp => {
        if (resp.code === 200) {
          this.listOfStoreWarranties.push(this.defaultSelection);
          for (const tempWarranty of resp.data) {
            this.listOfStoreWarranties.push(tempWarranty);
          }
        } else {
          this.listOfStoreWarranties = [];
        }
        this.isLoadingWarrantyInfo = false;
        this.ref.detectChanges();
      }, error => {
        this.listOfStoreWarranties = [];
        this.isLoadingWarrantyInfo = false;
        this.ref.detectChanges();
      });
    }, 500);
  }

  retrieveListOfShippings() {
    this.loadingService.present();
    setTimeout(() => {
      this.isLoadingShippingInfo = true;
      if (this.getListOfShippingSubscription) {
        this.getListOfShippingSubscription.unsubscribe();
      }
      this.getListOfShippingSubscription = this.storeControllerService.getShippingsByStoreUid(
          this.selectedStoreUid
      ).subscribe(resp => {
        if (resp.code === 200) {
          this.listOfStoreShippings.push(this.defaultSelection);
          for (const tempShipping of resp.data) {
            this.listOfStoreShippings.push(tempShipping);
          }
        } else {
          this.listOfStoreShippings = [];
        }
        this.isLoadingShippingInfo = false;
        this.ref.detectChanges();
      }, error => {
        this.listOfStoreShippings = [];
        this.isLoadingShippingInfo = false;
        this.ref.detectChanges();
      });
    }, 500);
  }

  removeSelectedInventoryFamilyAndOrPattern(index: number) {
    this.globalFunctionService.presentAlertConfirm(
        'Warning',
        'Are you sure you want to remove the Inventory Family & Pattern?',
        'Cancel',
        'Confirm',
        undefined,
        () => this.removeInventoryFamilyAndOrPattern(index));

  }

  removeInventoryFamilyAndOrPattern(index: number) {
    this.selectedInventory.inventoryfamilies.splice(index, 1);
  }

  async openEditInventoryFamiliesAndPatternsModal(inventoryFamiliesAndPatternsToEdit: InventoryFamily) {
    const modal = await this.modalController.create({
      component: EditInventoryFamiliesAndPatternsPage,
      componentProps: {
        inventoryFamiliesAndPatternsToEdit
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined && dataReturned.data !== null) {
        for (let i = 0 ; i < this.selectedInventory.inventoryfamilies.length ; i++) {
          if (this.selectedInventory.inventoryfamilies[i].id === dataReturned.data.id) {
            this.selectedInventory.inventoryfamilies[i] = dataReturned.data;
          }
        }
      }
      this.ref.detectChanges();
    });
    return await modal.present();
  }

  async openAddInventoryFamilyAndPatternModal() {
    const modal = await this.modalController.create({
      component: InvFamilyPatternModalPage
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined && dataReturned.data !== null) {
        this.selectedInventory.inventoryfamilies.push(dataReturned.data);
      }
    });
    return await modal.present();
  }

  async closeInventoryDetailsModal(returnFromEditingInventory: boolean) {
    await this.modalController.dismiss(returnFromEditingInventory);
  }

  updateInventory() {
    console.log(this.selectedInventory);
    if (this.inventoryInfoFormGroup.valid
        && this.selectedInventory.inventoryfamilies.length > 0) {
      this.loadingService.present();
      this.updateInventorySubscription = this.inventoryControllerService.updateInventoryByUid(
          this.selectedInventoryUid,
          this.selectedInventory.name,
          this.selectedStoreId,
          JSON.stringify(this.selectedInventory.inventoryfamilies),
          this.selectedInventory.cost,
          this.selectedInventory.price,
          this.selectedInventory.qty,
          this.selectedInventory.onsale,
          this.selectedProductPromotionPlan.id,
          this.selectedWarrantyPlan.id,
          this.selectedShippingPlan.id,
          this.selectedInventory.code,
          this.selectedInventory.sku,
          this.selectedInventory.desc,
          this.selectedInventory.stockthreshold
      ).subscribe(resp => {
        console.log(resp);
        if (resp.code === 200) {
          this.globalFunctionService.simpleToast('SUCCESS', 'The Inventory has been updated!', 'success');
          this.closeInventoryDetailsModal(true);
        } else {
          this.globalFunctionService.simpleToast('ERROR', 'Unable to update Inventory Info, please try again later!', 'danger');
        }
        this.loadingService.dismiss();
      }, error => {
        console.log('API Error while updating Inventory');
        this.loadingService.dismiss();
        this.globalFunctionService.simpleToast('ERROR', 'Unable to update Inventory Info, please try again later!', 'danger');
      });
    }
  }

  filterPromotions(productPromotionList: ProductPromotion[], text: string) {
    return productPromotionList.filter(promo => {
      return promo.name.toLowerCase().indexOf(text) !== -1;
    });
  }

  // searchForPromotions(event: {
  //   component: IonicSelectableComponent,
  //   text: string
  // }) {
  //   console.log('search');
  //   const text = event.text.trim().toLowerCase();
  //   event.component.startSearch();
  //   if (this.searchForListOfPromotionsSubscription) {
  //     this.searchForListOfPromotionsSubscription.unsubscribe();
  //   }
  //   this.currentPromotionPageNumber = 1;
  //   if (!text) {
  //     if (this.searchForListOfPromotionsSubscription) {
  //       this.searchForListOfPromotionsSubscription.unsubscribe();
  //     }
  //     this.searchForListOfPromotionsSubscription = this.storeControllerService.getPromotionsByStoreUid(
  //         this.selectedStoreUid,
  //         this.currentPromotionPageNumber,
  //         this.currentPageSize
  //     ).subscribe(resp => {
  //       if (resp.code === 200) {
  //         this.listOfStorePromotions.push(this.defaultSelection);
  //         for (const tempPromo of resp.data) {
  //           this.listOfStorePromotions.push(tempPromo);
  //         }
  //         this.promotionMaxPages = resp.maximumPages;
  //         event.component.items = this.listOfStorePromotions;
  //       } else {
  //         this.listOfStorePromotions = [];
  //         this.promotionMaxPages = 0;
  //       }
  //       event.component.endSearch();
  //       event.component.enableInfiniteScroll();
  //       this.ref.detectChanges();
  //     }, error => {
  //       console.log('API error while retrieving list of product promotions, error: ' + error);
  //     });
  //     return;
  //   }
  //   // getFilterPromotionsByStoreUid
  //   this.searchForListOfPromotionsSubscription = this.storeControllerService.(
  //       this.currentPromotionPageNumber,
  //       this.currentPageSize,
  //       text
  //   ).subscribe(resp => {
  //     if (this.searchForListOfPromotionsSubscription.closed) {
  //       return;
  //     }
  //     if (resp.code === 200) {
  //       this.listOfStorePromotions = this.filterPromotions(resp.data, text);
  //     }
  //     event.component.endSearch();
  //     event.component.enableInfiniteScroll();
  //     this.ref.detectChanges();
  //   }, error => {
  //     console.log('API Error while retrieving filtered product promotion list.');
  //     console.log(error);
  //   });
  // }
}
