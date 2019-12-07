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
    inventorySellingPriceModel: number;
    inventoryStockQuantityModel: number;
    inventoryStockThresholdModel: number;
    inventoryFamilyNameModel: string;
    inventoryFamilyCodeModel: string;
    inventoryFamilySKUModel: string;
    inventoryFamilyDescriptionModel: string;
    inventoryFamilyCostModel: number;
    inventoryFamilySellingPriceModel: number;
    inventoryFamilyStockQuantityModel: number;
    inventoryPatternNameModel: string;
    inventoryPatternDescriptionModel: string;
    inventoryPatternCostModel: number;
    inventoryPatternSellingPriceModel: number;
    inventoryPatternStockQuantityModel: number;

    // Regex
    alphaNumericOnlyRegex = '^[a-zA-Z0-9_]+$';
    priceRegex = new RegExp(/^\d+(\.\d{2})?$/);
    numericOnlyRegex = '^[0-9]+$';

    // Booleans
    didUploadPhoto = false;

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
    inventoryStockQuantityMaxLength = 3;
    inventoryStockThresholdMaxLength = 3;
    inventoryFamilyNameMaxLength = 50;
    inventoryFamilyCodeMinLength = 2;
    inventoryFamilyCodeMaxLength = 30;
    inventoryFamilyDescMinLength = 5;
    inventoryFamilyDescMaxLength = 50;
    inventoryFamilyCostMaxLength = 10;
    inventoryFamilySellingPriceMaxLength = 10;
    inventoryFamilyStockQuantityMaxLength = 3;
    inventoryPatternNameMaxLength = 50;
    inventoryPatternDescMinLength = 5;
    inventoryPatternDescMaxLength = 50;
    inventoryPatternCostMaxLength = 10;
    inventoryPatternSellingPriceMaxLength = 10;
    inventoryPatternStockQuantityMaxLength = 3;

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
    selectedFamilyOnSaleToggle = true;
    selectedPatternOnSaleToggle = true;

    // FormGroups
    inventoryInfoFormGroup: FormGroup;
    inventoryFamilyFormGroup: FormGroup;
    inventoryPatternFormGroup: FormGroup;

    // Subscriptions
    storePromotionsSubscription: any;
    storeWarrantySubscription: any;
    storeShippingSubscription: any;

    constructor(
        private ngZone: NgZone,
        private router: Router,
        private storeControllerService: StoreControllerServiceService,
        private globalFunctionService: GlobalfunctionService,
        private inventoryControllerService: InventoryControllerServiceService
    ) {
        console.log(this.constructorName + 'Initializing component');
    }

    ngOnInit() {
        this.ngZone.run(() => {
            this.storePromotionsSubscription = this.storeControllerService.getPromotionsByStoreUid(
                '1575382099-2'
            ).subscribe(resp => {
                if (resp.code === 200) {
                    this.listOfStorePromotions = resp.data;
                    this.selectedPromotionPlan = this.listOfStorePromotions[0];
                    console.log('default promotion plan selected');
                    console.log(this.selectedPromotionPlan);
                } else {
                    this.listOfStorePromotions = [];
                }
            }, error => {
                this.listOfStorePromotions = [];
            });
            this.storeWarrantySubscription = this.storeControllerService.getWarrantiesByStoreUid(
                '1575382099-2'
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
                '1575382099-2'
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
                inventorySellingPrice: new FormControl(null, [
                    Validators.required,
                    Validators.maxLength(this.inventorySellingPriceMaxLength),
                    Validators.pattern(this.priceRegex)
                ]),
                inventoryStockQuantity: new FormControl(null, [
                    Validators.required,
                    Validators.maxLength(this.inventoryStockQuantityMaxLength),
                    Validators.pattern(this.numericOnlyRegex)
                ]),
                inventoryStockThreshold: new FormControl(null, [
                    Validators.required,
                    Validators.maxLength(this.inventoryStockThresholdMaxLength),
                    Validators.pattern(this.numericOnlyRegex)
                ])
            });
            this.inventoryFamilyFormGroup = new FormGroup({
               inventoryFamilyName: new FormControl(null, [
                   Validators.required,
                   Validators.maxLength(this.inventoryFamilyNameMaxLength)
               ]),
                inventoryFamilyCode: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(this.inventoryFamilyCodeMinLength),
                    Validators.maxLength(this.inventoryFamilyCodeMaxLength),
                    Validators.pattern(this.alphaNumericOnlyRegex)
                ]),
                inventoryFamilySKU: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(this.inventorySKUMinLength),
                    Validators.maxLength(this.inventorySKUMaxLength),
                    Validators.pattern(this.alphaNumericOnlyRegex)
                ]),
                inventoryFamilyDescription: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(this.inventoryFamilyDescMinLength),
                    Validators.maxLength(this.inventoryFamilyDescMaxLength)
                ]),
                inventoryFamilyCost: new FormControl(null, [
                    Validators.required,
                    Validators.maxLength(this.inventoryFamilyCostMaxLength),
                    Validators.pattern(this.priceRegex)
                ]),
                inventoryFamilySellingPrice: new FormControl(null, [
                    Validators.required,
                    Validators.maxLength(this.inventoryFamilySellingPriceMaxLength),
                    Validators.pattern(this.priceRegex)
                ]),
                inventoryFamilyStockQuantity: new FormControl(null, [
                    Validators.required,
                    Validators.maxLength(this.inventoryFamilyStockQuantityMaxLength),
                    Validators.pattern(this.numericOnlyRegex)
                ])
            });
            this.inventoryPatternFormGroup = new FormGroup({
               inventoryPatternName: new FormControl(null, [
                   Validators.required,
                   Validators.maxLength(this.inventoryPatternNameMaxLength)
               ]),
                inventoryPatternDescription: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(this.inventoryPatternDescMinLength),
                    Validators.maxLength(this.inventoryPatternDescMaxLength)
                ]),
                inventoryPatternCost: new FormControl(null, [
                    Validators.required,
                    Validators.maxLength(this.inventoryPatternCostMaxLength),
                    Validators.pattern(this.priceRegex)
                ]),
                inventoryPatternSellingPrice: new FormControl(null, [
                    Validators.required,
                    Validators.maxLength(this.inventoryPatternSellingPriceMaxLength),
                    Validators.pattern(this.priceRegex)
                ]),
                inventoryPatternStockQuantity: new FormControl(null, [
                    Validators.required,
                    Validators.maxLength(this.inventoryPatternStockQuantityMaxLength),
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
        this.didUploadPhoto = false;
        if (files) {
            for (const file of files) {
                if (file.type.toString().includes('image')) {
                    const reader = new FileReader();
                    reader.onload = (e: any) => {
                        this.inventoryImagesUrl.push(e.target.result);
                        this.didUploadPhoto = true;
                    };
                    reader.readAsDataURL(file);
                }
            }
        }
        if (this.didUploadPhoto) {
            this.globalFunctionService.simpleToast('SUCCESS', 'Image has been uploaded! You can upload up to 7 pictures!', 'success', 'top');
        }
    }

    toggleFamilyOnSaleCheckbox() {
        this.selectedFamilyOnSaleToggle = !this.selectedFamilyOnSaleToggle;
    }

    togglePatternOnSaleCheckbox() {
        this.selectedPatternOnSaleToggle = !this.selectedPatternOnSaleToggle;
        console.log('seelcted pattern toggle on sale');
        console.log(this.selectedPatternOnSaleToggle);
    }

    onStep1Next(event: any) {
        console.log('step 1');
        console.log(this.inventoryNameModel);
        console.log(this.inventoryCodeModel);
        console.log(this.inventorySKUModel);
        console.log(this.inventoryDescriptionModel);
        console.log(this.inventoryCostModel);
        console.log(this.inventorySellingPriceModel);
        console.log(this.inventoryStockQuantityModel);
        console.log(this.inventoryStockThresholdModel);
        console.log(this.inventoryImagesUrl);
    }

    onStep2Next(event: any) {
        console.log('step 2');
        console.log(this.selectedPromotionPlan);
        console.log(this.selectedWarrantyPlan);
        console.log(this.selectedShippingPlan);
    }

    onStep3Next(event: any) {
        console.log('step 3');
    }

    onComplete(event: any) {
        console.log('complete:' + event);
    }

    /*  pickMultipleImages() {
    console.log('pick multiple images');
    const options: ImagePickerOptions = {
      maximumImagesCount: 3,
      width: 100,
      height: 100
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (let i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }*/
}
