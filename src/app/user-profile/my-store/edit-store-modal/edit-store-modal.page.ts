import {ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Company, CompanyControllerServiceService, Store, StoreControllerServiceService} from '../../../_dal/ipohdrum';
import {ModalController} from '@ionic/angular';
import {LoadingService} from '../../../_dal/common/services/loading.service';
import {IonicSelectableComponent} from 'ionic-selectable';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {commonConfig} from '../../../_dal/common/commonConfig';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';

@Component({
  selector: 'app-edit-store-modal',
  templateUrl: './edit-store-modal.page.html',
  styleUrls: ['./edit-store-modal.page.scss'],
})

export class EditStoreModalPage implements OnInit {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  selectedStoreUid: string;
  phoneNumberRegex = commonConfig.phoneNumberRegex;

  // Numbers
  currentPageNumber = 1;
  currentPageSize = 20;
  maximumPages: number;
  storeNameMinLength = commonConfig.storeNameMinLength;
  storeNameMaxLength = commonConfig.storeNameMaxLength;
  storeContactNumMinLength = commonConfig.storeContactNumMinLength;
  storeContactNumMaxLength = commonConfig.storeContactNumMaxLength;
  storeDescriptionMinLength = commonConfig.storeDescriptionMinLength;
  storeDescriptionMaxLength = commonConfig.storeDescriptionMaxLength;
  storeNoStreetNameMaxLength = commonConfig.storeNoStreetNameMaxLength;
  storePostCodeMinLength = commonConfig.storePostCodeMinLength;
  storePostCodeMaxLength = commonConfig.storePostCodeMaxLength;
  storeCountryMaxLength = commonConfig.storeCountryMaxLength;
  storeStateMaxLength = commonConfig.storeStateMaxLength;
  storeCityMaxLength = commonConfig.storeCityMaxLength;

  // Booleans
  isLoadingStoreInfo = true;

  // Arrays
  storeImageAsBlobArray: Array<Blob> = [];
  listOfCompanies: Array<Company> = [];

  // ViewChilds
  @ViewChild('storeImageContainer', {static: false}) storeImageContainer: ElementRef;

  // Objects
  selectedStore: Store;
  temporaryStoreImageURL: Blob;

  // FormGroups
  storeInfoFormGroup: FormGroup;
  storeAddressFormGroup: FormGroup;

  // Subscriptions
  getStoreByUidSubscription: any;
  updateStoreSubscription: any;
  searchListOfCompaniesSubscription: any;
  appendListOfCompaniesSubscription: any;

  constructor(
      private ngZone: NgZone,
      private loadingService: LoadingService,
      private modalController: ModalController,
      private companyControllerService: CompanyControllerServiceService,
      private storeControllerService: StoreControllerServiceService,
      private globalFunctionService: GlobalfunctionService,
      private ref: ChangeDetectorRef
  ) {
    console.log(this.constructorName + 'Initializing component');
    this.loadingService.present();
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.storeInfoFormGroup = new FormGroup({
        storeName: new FormControl(null, [
          Validators.required,
          Validators.minLength(this.storeNameMinLength),
          Validators.maxLength(this.storeNameMaxLength)
        ]),
        storeContactNum: new FormControl(null, [
          Validators.required,
          Validators.minLength(this.storeContactNumMinLength),
          Validators.maxLength(this.storeContactNumMaxLength),
          Validators.pattern(this.phoneNumberRegex)
        ]),
        storeEmail: new FormControl(null, [
          Validators.required,
          Validators.email
        ]),
        storeDescription: new FormControl(null, [
          Validators.required,
          Validators.minLength(this.storeDescriptionMinLength),
          Validators.maxLength(this.storeDescriptionMaxLength)
        ])
      });
      this.storeAddressFormGroup = new FormGroup({
        noStreetName: new FormControl(null, [
          Validators.required,
          Validators.maxLength(this.storeNoStreetNameMaxLength)
        ]),
        storePostCode: new FormControl(null, [
          Validators.required,
          Validators.minLength(this.storePostCodeMinLength),
          Validators.maxLength(this.storePostCodeMaxLength)
        ]),
        storeCountry: new FormControl(null, [
          Validators.required,
          Validators.maxLength(this.storeCountryMaxLength)
        ]),
        storeState: new FormControl(null, [
          Validators.required,
          Validators.maxLength(this.storeStateMaxLength)
        ]),
        storeCity: new FormControl(null, [
          Validators.required,
          Validators.maxLength(this.storeCityMaxLength)
        ])
      });
      this.getStoreByUidSubscription = this.storeControllerService.getStoreByUid(
          this.selectedStoreUid
      ).subscribe(resp => {
        console.log('retrieved store:');
        console.log(resp);
        if (resp.code === 200) {
          this.selectedStore = resp.data;
        } else {
          this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Store\'s info, please try again later!', 'warning', 'top');
          this.closeEditStoreModal();
        }
        this.isLoadingStoreInfo = false;
        this.loadingService.dismiss();
        this.ref.detectChanges();
      }, error => {
        console.log('API Error while retrieving store by uid.');
        this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Store\'s info, please try again later!', 'warning', 'top');
        this.isLoadingStoreInfo = false;
        this.loadingService.dismiss();
        this.closeEditStoreModal();
      });
    });
  }

  async closeEditStoreModal() {
    await this.modalController.dismiss();
  }

  openStoreImageFilePicker() {
    this.storeImageContainer.nativeElement.click();
  }

  uploadStoreImage(event) {
    const files = event.target.files;
    if (files.length) {
      if (files[0].type.toString().includes('image')) {
        // Actual Blob File
        this.storeImageAsBlobArray[0] = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // Some URL for displaying purpose only
          this.temporaryStoreImageURL = e.target.result;
        };
        reader.readAsDataURL(files[0]);
      }
    }
  }

  updateStore() {
    console.log(this.storeImageAsBlobArray);
    this.loadingService.present();
    this.updateStoreSubscription = this.storeControllerService.updateStoreByUid(
        this.selectedStore.uid,
        this.selectedStore.name,
        this.selectedStore.companyBelongings,
        this.selectedStore.companyBelongings === 1 ? this.selectedStore.company.id : null,
        null,
        this.selectedStore.desc,
        this.selectedStore.contact,
        this.selectedStore.email,
        this.selectedStore.address,
        this.selectedStore.postcode,
        this.selectedStore.state,
        this.selectedStore.city,
        this.selectedStore.country,
        this.storeImageAsBlobArray[0] !== undefined || this.storeImageAsBlobArray[0] !== null ? this.storeImageAsBlobArray : null
    ).subscribe(resp => {
      this.loadingService.dismiss();
      if (resp.code === 200) {
        this.globalFunctionService.simpleToast('SUCCESS', 'Store has been updated.', 'success', 'top');
        this.closeEditStoreModal();
      } else {
        this.globalFunctionService.simpleToast('ERROR', 'Unable to update the Store, please try again later!', 'danger', 'top');
      }
    }, error => {
      console.log('API Error while updating store');
      this.loadingService.dismiss();
      this.globalFunctionService.simpleToast('ERROR', 'Unable to update the Store, please try again later!', 'danger', 'top');
    });
  }

  filterCompanies(companyList: Company[], text: string) {
    return companyList.filter(company => {
      return company.name.toLowerCase().indexOf(text) !== -1;
    });
  }

  searchForCompanies(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    const text = event.text.trim().toLowerCase();
    event.component.startSearch();
    if (this.searchListOfCompaniesSubscription) {
      this.searchListOfCompaniesSubscription.unsubscribe();
    }
    this.currentPageNumber = 1;
    if (!text) {
      if (this.searchListOfCompaniesSubscription) {
        this.searchListOfCompaniesSubscription.unsubscribe();
      }
      this.searchListOfCompaniesSubscription = this.companyControllerService.getCompanies(
          this.currentPageNumber,
          this.currentPageSize
      ).subscribe(resp => {
        if (resp.code === 200) {
          this.listOfCompanies = resp.data;
          this.maximumPages = resp.maximumPages;
          event.component.items = this.listOfCompanies;
        } else {
          this.listOfCompanies = [];
          this.maximumPages = 0;
        }
        event.component.endSearch();
        event.component.enableInfiniteScroll();
        this.ref.detectChanges();
      }, error => {
        console.log('API error while retrieving list of companies.');
        console.log(error);
      });
      return;
    }
    this.searchListOfCompaniesSubscription = this.companyControllerService.filterCompanies(
        this.currentPageNumber,
        this.currentPageSize,
        text
    ).subscribe(resp => {
      if (this.searchListOfCompaniesSubscription.closed) {
        return;
      }
      if (resp.code === 200) {
        this.listOfCompanies = this.filterCompanies(resp.data, text);
      }
      event.component.endSearch();
      event.component.enableInfiniteScroll();
      this.ref.detectChanges();
    }, error => {
      console.log('API Error while retrieving filtered company list.');
      console.log(error);
    });
  }

  retrieveMoreCompanies(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    const text = (event.text || '').trim().toLowerCase();
    if (this.currentPageNumber > this.maximumPages) {
      // event.component.disableInfiniteScroll();
      event.component.endInfiniteScroll();
      return;
    } else {
      this.currentPageNumber++;
      if (text) {
        this.appendListOfCompaniesSubscription = this.companyControllerService.filterCompanies(
            this.currentPageNumber,
            this.currentPageSize,
            text
        ).subscribe(resp => {
          if (resp.code === 200) {
            for (const company of resp.data) {
              this.listOfCompanies.push(company);
            }
          }
          event.component.items = this.listOfCompanies;
          event.component.endInfiniteScroll();
          this.ref.detectChanges();
        }, error => {
          event.component.endInfiniteScroll();
        });
      } else {
        this.appendListOfCompaniesSubscription = this.companyControllerService.getCompanies(
            this.currentPageNumber,
            this.currentPageSize
        ).subscribe(resp => {
          if (resp.code === 200) {
            for (const company of resp.data) {
              this.listOfCompanies.push(company);
            }
          }
          event.component.items = this.listOfCompanies;
          event.component.endInfiniteScroll();
          this.ref.detectChanges();
        }, error => {
          console.log('API error while retrieving list of companies.');
          console.log(error);
          event.component.endInfiniteScroll();
        });
      }
    }
  }
}
