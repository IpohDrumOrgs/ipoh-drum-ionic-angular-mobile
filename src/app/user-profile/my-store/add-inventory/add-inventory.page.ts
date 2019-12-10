import {Component, NgZone, OnInit} from '@angular/core';
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

@Component({
    selector: 'app-add-inventory',
    templateUrl: './add-inventory.page.html',
    styleUrls: ['./add-inventory.page.scss'],
})

export class AddInventoryPage implements OnInit {

    // Strings
    constructorName = '[' + this.constructor.name + ']';

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
    numericOnlyRegex = '^[0-9]+$';

    // Booleans
    formIsCompleted = false;

    // Number
    inventoryNameMinLength = 5;
    inventoryNameMaxLength = 30;
    inventoryCodeMinLength = 2;
    inventoryCodeMaxLength = 50;
    inventorySKUMinLength = 2;
    inventorySKUMaxLength = 30;
    inventoryDescMinLength = 5;
    inventoryDescMaxLength = 50;
    inventoryCostMaxLength = 10;
    inventorySellingPriceMaxLength = 10;
    inventoryStockThresholdMaxLength = 3;

    // Arrays
    inventoryImagesUrl = new Array<string>();
    listOfStorePromotions: ProductPromotion [] = [];
    listOfStoreWarranties: Warranty[] = [];
    listOfStoreShippings: Shipping[] = [];

    // Objects
    inventoryImageSliderOptions = {
        autoHeight: true,
        initialSlide: 0,
        speed: 400
    };
    selectedPromotionPlan: ProductPromotion;
    selectedWarrantyPlan: Warranty;
    selectedShippingPlan: Shipping;
    inventoryFamilyAndOrPatternsToInsert: Array<Object> = [];

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
        private modalController: ModalController
    ) {
        console.log(this.constructorName + 'Initializing component');
    }

    ngOnInit() {
        this.ngZone.run(() => {
            this.storePromotionsSubscription = this.storeControllerService.getPromotionsByStoreUid(
                '1575903140-1'
            ).subscribe(resp => {
                if (resp.code === 200) {
                    this.listOfStorePromotions = resp.data;
                    this.selectedPromotionPlan = this.listOfStorePromotions[0];
                } else {
                    this.listOfStorePromotions = [];
                }
            }, error => {
                this.listOfStorePromotions = [];
            });
            this.storeWarrantySubscription = this.storeControllerService.getWarrantiesByStoreUid(
                '1575903140-1'
            ).subscribe(resp => {
                if (resp.code === 200) {
                    this.listOfStoreWarranties = resp.data;
                    this.selectedWarrantyPlan = this.listOfStoreWarranties[0];
                } else {
                    this.listOfStoreWarranties = [];
                }
            }, error => {
                this.listOfStoreWarranties = [];
            });
            this.storeShippingSubscription = this.storeControllerService.getShippingsByStoreUid(
                '1575903140-1'
            ).subscribe(resp => {
                if (resp.code === 200) {
                    this.listOfStoreShippings = resp.data;
                    this.selectedShippingPlan = this.listOfStoreShippings[0];
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
                    Validators.maxLength(this.inventoryCodeMaxLength),
                    Validators.pattern(this.alphaNumericOnlyRegex)
                ]),
                inventorySKU: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(this.inventorySKUMinLength),
                    Validators.maxLength(this.inventorySKUMaxLength),
                    Validators.pattern(this.alphaNumericOnlyRegex)
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

    backToMyStorePage() {
        this.router.navigate(['ipoh-drum/user-profile/my-store']);
    }

    detectFiles(event) {
        const files = event.target.files;
        if (this.inventoryImagesUrl.length !== 5) {
            if (files) {
                for (const file of files) {
                    if (file.type.toString().includes('image')) {
                        const reader = new FileReader();
                        reader.onload = (e: any) => {
                            this.inventoryImagesUrl.push(e.target.result);
                        };
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

    onComplete() {
        if (this.inventoryInfoFormGroup.valid) {
            this.formIsCompleted = true;
            console.log(JSON.stringify(this.inventoryFamilyAndOrPatternsToInsert));
            this.createInventorySubscription = this.inventoryControllerService.createInventory(
                this.inventoryNameModel,
                2,
                this.selectedPromotionPlan.id,
                this.selectedWarrantyPlan.id,
                this.selectedShippingPlan.id,
                this.inventoryCostModel,
                this.inventoryBasePriceModel,
                JSON.stringify(this.inventoryFamilyAndOrPatternsToInsert),
                this.inventoryCodeModel,
                this.inventorySKUModel,
                this.inventoryDescriptionModel,
                this.inventoryStockThresholdModel,
                undefined // TODO, Convert images to Array of BLOB
            ).subscribe(resp => {
                console.log(resp);
            }, error => {
                console.log('API error while creating new inventory');
            });
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
            'Are you sure you want to reset the uploaded images?',
            'Cancel',
            'Confirm',
            undefined,
            () => this.resetInventoryImages());
    }

    resetInventoryImages() {
        this.inventoryImagesUrl = [];
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
}
