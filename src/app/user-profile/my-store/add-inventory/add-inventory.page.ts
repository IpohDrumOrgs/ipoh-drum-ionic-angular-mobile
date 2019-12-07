import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductPromotion, Shipping, StoreControllerServiceService, Warranty} from '../../../_dal/ipohdrum';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.page.html',
  styleUrls: ['./add-inventory.page.scss'],
})

export class AddInventoryPage implements OnInit {

  // Strings
  constructorName = '[' + this.constructor.name + ']';

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

  // Subscriptions
  storePromotionsSubscription: any;
  storeWarrantySubscription: any;
  storeShippingSubscription: any;

  constructor(
      private ngZone: NgZone,
      private router: Router,
      private storeControllerService: StoreControllerServiceService
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
              console.log(this.listOfStoreWarranties);
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
        } else {
          this.listOfStoreShippings = [];
        }
      }, error => {
        this.listOfStoreShippings = [];
      });
    });
  }

  backToMyStorePage() {
    this.router.navigate(['ipoh-drum/user-profile/my-store']);
  }

  detectFiles(event) {
    console.log(event);
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.inventoryImagesUrl.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  pickedPromotionPlan() {
    console.log('selected promotion plan');
    console.log(this.selectedPromotionPlan);
  }

  pickedWarrantyPlan() {
      console.log('selected warranty plan');
      console.log(this.selectedWarrantyPlan);
  }

  pickedShippingPlan() {
    console.log('selected shiping plan');
    console.log(this.selectedShippingPlan);
  }

  toggleFamilyOnSaleCheckbox() {
    this.selectedFamilyOnSaleToggle = !this.selectedFamilyOnSaleToggle;
    console.log('selected family toggle on sale');
    console.log(this.selectedFamilyOnSaleToggle);
  }

  togglePatternOnSaleCheckbox() {
      this.selectedPatternOnSaleToggle = !this.selectedPatternOnSaleToggle;
      console.log('seelcted pattern toggle on sale');
      console.log(this.selectedPatternOnSaleToggle);
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

/*  onStep1Next(event: any) {
    console.log('step 1');
  }

  onStep2Next(event: any) {
    console.log('step 2');
  }

  onStep3Next(event: any) {
    console.log('step 3');
  }

  onComplete(event: any) {
    console.log('complete:' + event);
  }*/
}
