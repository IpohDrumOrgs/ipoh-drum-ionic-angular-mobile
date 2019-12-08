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
    inventoryBasePriceModel: number;
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
    inventoryFamilyToInsert: any = {};

    // FormGroups
    inventoryInfoFormGroup: FormGroup;
    inventoryFamilyFormGroup: FormGroup;
    inventoryPatternFormGroup: FormGroup;

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

    toggleFamilyOnSaleCheckbox() {
        this.selectedFamilyOnSaleToggle = !this.selectedFamilyOnSaleToggle;
    }

    togglePatternOnSaleCheckbox() {
        this.selectedPatternOnSaleToggle = !this.selectedPatternOnSaleToggle;
        console.log('seelcted pattern toggle on sale');
        console.log(this.selectedPatternOnSaleToggle);
    }

    onComplete() {
        console.log('complete:');
        this.formIsCompleted = true;
        this.formInventoryFamilyObject();
        // Hard-coded data
        this.inventoryNameModel = 'invenotry name ex';
        this.inventoryCostModel = 55.20;
        this.inventoryBasePriceModel = 60;
        this.inventoryCodeModel = 'inventorycodeex';
        this.inventorySKUModel = 'inventoryskuex';
        this.inventoryDescriptionModel = 'inventory description example';
        this.inventoryStockThresholdModel = 5;

        let inventoryFamilyArray = [];
        inventoryFamilyArray.push(this.inventoryFamilyToInsert);
        console.log(JSON.stringify(inventoryFamilyArray));

        this.createInventorySubscription = this.inventoryControllerService.createInventory(
            this.inventoryNameModel,
            2,
            this.selectedPromotionPlan.id,
            this.selectedWarrantyPlan.id,
            this.selectedShippingPlan.id,
            this.inventoryCostModel,
            this.inventoryBasePriceModel,
            JSON.stringify(inventoryFamilyArray),
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

    formInventoryFamilyObject() {
        this.inventoryFamilyToInsert.code = this.inventoryFamilyCodeModel;
        this.inventoryFamilyToInsert.cost = this.inventoryFamilyCostModel;
        // created_at
        this.inventoryFamilyToInsert.desc = this.inventoryFamilyDescriptionModel;
        // id
        // imgpath
        // imgpublicid
        // inventory_id
        this.inventoryFamilyToInsert.name = this.inventoryFamilyNameModel;
        this.inventoryFamilyToInsert.onsale = this.selectedFamilyOnSaleToggle;
        // inventoryFamily.patterns.push();
        this.inventoryFamilyToInsert.price = this.inventoryFamilySellingPriceModel;
        this.inventoryFamilyToInsert.qty = this.inventoryFamilyStockQuantityModel;
        // salesqty
        this.inventoryFamilyToInsert.sku = this.inventoryFamilySKUModel;
        // status
        // uid
        // updated_at

        // TODO: Hard-coded data
        this.inventoryFamilyToInsert.code = 'familycodeex';
        this.inventoryFamilyToInsert.cost = '59.90';
        this.inventoryFamilyToInsert.desc = 'family description';
        this.inventoryFamilyToInsert.name = 'family name ex';
        this.inventoryFamilyToInsert.onsale = true;
        this.inventoryFamilyToInsert.price = '60';
        this.inventoryFamilyToInsert.qty = '99';
        this.inventoryFamilyToInsert.sku = 'familyskuex';


        console.log(JSON.stringify(this.inventoryFamilyToInsert));
        this.formInventoryPatternObject();
    }

    formInventoryPatternObject() {
        let inventoryPattern: any = {};
        // inventoryPattern.cost = this.inventoryPatternCostModel;
        // // created_at
        // inventoryPattern.desc = this.inventoryPatternDescriptionModel;
        // // id
        // // imgpath
        // // imgpublicid
        // // inventory_family_id
        // inventoryPattern.name = this.inventoryPatternNameModel;
        // inventoryPattern.onsale = this.selectedPatternOnSaleToggle;
        // inventoryPattern.price = this.inventoryPatternSellingPriceModel;
        // inventoryPattern.qty = this.inventoryPatternStockQuantityModel;
        // // salesqty
        // // status
        // // uid
        // // updated_at

        this.inventoryFamilyToInsert.patterns = [];

        // TODO: Hard-coded data
        inventoryPattern.cost = '25.00';
        inventoryPattern.desc = 'pattern description';
        inventoryPattern.name = 'pattern name';
        inventoryPattern.onsale = false;
        inventoryPattern.price = '30';
        inventoryPattern.qty = '80';

        this.inventoryFamilyToInsert.patterns.push(inventoryPattern);
        this.inventoryFamilyToInsert.patterns.push(inventoryPattern);

        console.log(JSON.stringify(this.inventoryFamilyToInsert));
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
