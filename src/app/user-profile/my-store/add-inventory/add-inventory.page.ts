import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {
    InventoryControllerServiceService,
    ProductPromotion,
    Shipping,
    StoreControllerServiceService,
    Warranty
} from '../../../_dal/ipohdrum';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {InvFamilyPatternModalPage} from './inv-family-pattern-modal/inv-family-pattern-modal.page';
import {LoadingService} from '../../../_dal/common/services/loading.service';
import {commonConfig} from '../../../_dal/common/commonConfig';

@Component({
    selector: 'app-add-inventory',
    templateUrl: './add-inventory.page.html',
    styleUrls: ['./add-inventory.page.scss'],
})

export class AddInventoryPage implements OnInit, OnDestroy {

    // Strings
    constructorName = '[' + this.constructor.name + ']';
    defaultNoPlanSelectedStr = 'Default (None)';
    selectedStoreUid: string;

    // NgModels
    inventoryNameModel: string;
    inventoryCodeModel: string;
    inventorySKUModel: string;
    inventoryDescriptionModel: string;
    inventoryCostModel: number;
    inventoryBasePriceModel: number;
    inventoryStockThresholdModel: number;

    // Regex
    alphaNumericOnlyRegex = '^[a-zA-Z0-9_]+$';
    priceRegex = new RegExp(/^\d+(\.\d{2})?$/);
    numericOnlyRegex = commonConfig.numericOnlyRegex;

    // Number
    selectedStoreId: number;
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
    maxInventoryPhotoSlider = 5;

    // Booleans
    showFirstPage = true;
    showSecondPage = false;
    showThirdPage = false;

    // ViewChild
    @ViewChild('inventoryThumbnailContainer', {static: false}) inventoryThumbnailContainer: ElementRef;
    @ViewChild('inventorySlidersContainer', {static: false}) inventorySlidersContainer: ElementRef;

    // Arrays
    inventoryFamilyAndOrPatternsToInsert: Array<object> = [];
    listOfStorePromotions: ProductPromotion [] = [];
    listOfStoreWarranties: Warranty[] = [];
    listOfStoreShippings: Shipping[] = [];
    inventoryThumbnailAsArray: Array<Blob> = [];
    temporaryInventorySliders: Array<Blob> = [];
    inventorySlidersAsArray: Array<Blob> = [];
    ionSliderOptions = {
        autoHeight: true,
        initialSlide: 0,
        speed: 400
    };

    // Objects
    inventoryImageSliderOptions = {
        autoHeight: true,
        initialSlide: 0,
        speed: 400
    };
    selectedPromotionPlan: ProductPromotion = null;
    selectedWarrantyPlan: Warranty = null;
    selectedShippingPlan: Shipping = null;
    temporaryInventoryThumbnail: Blob;

    // FormGroups
    inventoryInfoFormGroup: FormGroup;

    // Subscriptions
    storePromotionsSubscription: any;
    storeWarrantySubscription: any;
    storeShippingSubscription: any;
    createInventorySubscription: any;

    constructor(
        private ngZone: NgZone,
        private router: Router,
        private storeControllerService: StoreControllerServiceService,
        private globalFunctionService: GlobalfunctionService,
        private inventoryControllerService: InventoryControllerServiceService,
        private modalController: ModalController,
        private loadingService: LoadingService
    ) {
        console.log(this.constructorName + 'Initializing component');
    }

    ngOnInit() {
        this.ngZone.run(() => {
            this.storePromotionsSubscription = this.storeControllerService.getPromotionsByStoreUid(
                this.selectedStoreUid
            ).subscribe(resp => {
                if (resp.code === 200) {
                    this.listOfStorePromotions = resp.data;
                } else {
                    this.listOfStorePromotions = [];
                }
            }, error => {
                this.listOfStorePromotions = [];
            });
            this.storeWarrantySubscription = this.storeControllerService.getWarrantiesByStoreUid(
                this.selectedStoreUid
            ).subscribe(resp => {
                if (resp.code === 200) {
                    this.listOfStoreWarranties = resp.data;
                } else {
                    this.listOfStoreWarranties = [];
                }
            }, error => {
                this.listOfStoreWarranties = [];
            });
            this.storeShippingSubscription = this.storeControllerService.getShippingsByStoreUid(
                this.selectedStoreUid
            ).subscribe(resp => {
                if (resp.code === 200) {
                    this.listOfStoreShippings = resp.data;
                } else {
                    this.listOfStoreShippings = [];
                }
            }, error => {
                this.listOfStoreShippings = [];
            });
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
            if (this.storePromotionsSubscription) {
                this.storePromotionsSubscription.unsubscribe();
            }
            if (this.storeWarrantySubscription) {
                this.storeWarrantySubscription.unsubscribe();
            }
            if (this.storeShippingSubscription) {
                this.storeShippingSubscription.unsubscribe();
            }
            if (this.createInventorySubscription) {
                this.createInventorySubscription.unsubscribe();
            }
        });
    }

    createInventory() {
        if (this.inventoryInfoFormGroup.valid
            && this.temporaryInventorySliders.length > 0
            && this.temporaryInventoryThumbnail !== undefined
            && this.temporaryInventoryThumbnail !== null
            && this.inventoryFamilyAndOrPatternsToInsert.length > 0
        ) {
            this.loadingService.present();
            this.createInventorySubscription = this.inventoryControllerService.createInventory(
                this.inventoryNameModel,
                this.selectedStoreId,
                JSON.stringify(this.inventoryFamilyAndOrPatternsToInsert),
                this.inventoryCostModel,
                this.inventoryBasePriceModel,
                this.selectedPromotionPlan ? this.selectedPromotionPlan.id : null,
                this.selectedWarrantyPlan ? this.selectedWarrantyPlan.id : null,
                this.selectedShippingPlan ? this.selectedShippingPlan.id : null,
                this.inventoryCodeModel,
                this.inventorySKUModel,
                this.inventoryDescriptionModel,
                this.inventoryStockThresholdModel,
                this.inventoryThumbnailAsArray,
                this.inventorySlidersAsArray
            ).subscribe(resp => {
                if (resp.code === 200) {
                    this.globalFunctionService.simpleToast('SUCCESS', 'Inventory has been successfully created!', 'success', 'top');
                    this.closeCreateInventoryModal(true);
                } else {
                    // tslint:disable-next-line:max-line-length
                    this.globalFunctionService.simpleToast('ERROR', 'Something went wrong while creating the Inventory, please try again later!', 'warning', 'top');
                }
                this.loadingService.dismiss();
            }, error => {
                console.log('API error while creating new inventory');
                this.loadingService.dismiss();
                // tslint:disable-next-line:max-line-length
                this.globalFunctionService.simpleToast('ERROR', 'Something went wrong while creating the Inventory, please try again later!', 'warning', 'top');
            });
        }
    }

    openSlidersFilePicker() {
        this.inventorySlidersContainer.nativeElement.click();
    }

    uploadInventorySliders(event) {
        const files = event.target.files;
        if (this.temporaryInventorySliders.length < 5 && (files.length + this.temporaryInventorySliders.length <= 5)) {
            if (files) {
                for (const file of files) {
                    if (file.type.toString().includes('image')) {
                        this.inventorySlidersAsArray.push(file);
                        const reader = new FileReader();
                        reader.onload = (e: any) => {
                            this.temporaryInventorySliders.push(e.target.result);
                        };
                        console.log(this.temporaryInventorySliders);
                        reader.readAsDataURL(file);
                    } else {
                        // tslint:disable-next-line:max-line-length
                        this.globalFunctionService.simpleToast('ERROR', 'You may have selected an invalid file! Please try again.', 'danger', 'top');
                        break;
                    }
                }
            }
        } else {
            this.globalFunctionService.simpleToast('WARNING', 'You have reached the max number of uploaded photos!', 'warning', 'top');
        }
    }

    openThumbnailFilePicker() {
        this.inventoryThumbnailContainer.nativeElement.click();
    }

    uploadInventoryThumbnail(event) {
        const files = event.target.files;
        if (files.length > 0) {
            if (files[0].type.toString().includes('image')) {
                // Actual Blob File
                this.inventoryThumbnailAsArray[0] = event.target.files[0];
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    // Some URL for displaying purpose only
                    this.temporaryInventoryThumbnail = e.target.result;
                };
                reader.readAsDataURL(files[0]);
            }
        }
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
        this.inventoryFamilyAndOrPatternsToInsert.splice(index, 1);
    }

    resetSelectedInventoryImages() {
        this.globalFunctionService.presentAlertConfirm(
            'Warning',
            'Are you sure you want to reset the uploaded Inventory Images?',
            'Cancel',
            'Confirm',
            undefined,
            () => this.resetInventoryImages());
    }

    resetInventoryImages() {
        this.temporaryInventorySliders = [];
        this.inventorySlidersAsArray = [];
    }

    async openAddInventoryFamilyAndPatternModal() {
        const modal = await this.modalController.create({
            component: InvFamilyPatternModalPage
        });
        modal.onDidDismiss().then((dataReturned) => {
            if (dataReturned.data !== undefined && dataReturned.data !== null) {
                this.inventoryFamilyAndOrPatternsToInsert.push(dataReturned.data);
            }
        });
        return await modal.present();
    }

    async closeCreateInventoryModal(returnFromCreatingInventory: boolean) {
        await this.modalController.dismiss(returnFromCreatingInventory);
    }

    showWhichPage(pageNum: number) {
        switch (pageNum) {
            case 1:
                this.showFirstPage = true;
                this.showSecondPage = false;
                this.showThirdPage = false;
                break;
            case 2:
                this.showFirstPage = false;
                this.showSecondPage = true;
                this.showThirdPage = false;
                break;
            case 3:
                this.showFirstPage = false;
                this.showSecondPage = false;
                this.showThirdPage = true;
                break;
        }
    }
}
