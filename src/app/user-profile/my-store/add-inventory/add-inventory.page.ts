import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StoreControllerServiceService} from '../../../_dal/ipohdrum';
import {flatten} from '@angular/compiler';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.page.html',
  styleUrls: ['./add-inventory.page.scss'],
})

export class AddInventoryPage implements OnInit {

  // Strings
  constructorName = '[' + this.constructor.name + ']';

  // Arrays
  temporaryImageUrls = new Array<string>();
  images: any[] = [];
  storePromotions: any [] = [];

  // Objects
  // options: any;
  ionSliderOptions = {
    autoHeight: true,
    initialSlide: 0,
    speed: 400
  };
  flattenStorePromotionsForSelect2: any;

  select2Options = {
    width: '100%',
    multiple: false
  };

  // Subscriptions
  storePromotionsSubscription: any;

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
        console.log(resp);
        if (resp.code === 200) {
          const flattenStorePromotion = [];
          this.storePromotions = resp.data;
          this.storePromotions.forEach(sp => {
            flattenStorePromotion.push(sp);
          });
          this.flattenStorePromotionsForSelect2 = flattenStorePromotion.map(f => {
            return {id: f.id, text: f.name};
          });
        }
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
          this.temporaryImageUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
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
