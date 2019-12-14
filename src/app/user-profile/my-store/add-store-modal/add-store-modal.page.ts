import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CompanyControllerServiceService, StoreControllerServiceService} from '../../../_dal/ipohdrum';
import {Company} from '../../../_dal/ipohdrum';
import {IonicSelectableComponent} from 'ionic-selectable';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {commonConfig} from '../../../_dal/common/commonConfig';
import {LoadingService} from '../../../_dal/common/services/loading.service';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';

@Component({
  selector: 'app-add-store-modal',
  templateUrl: './add-store-modal.page.html',
  styleUrls: ['./add-store-modal.page.scss'],
})

export class AddStoreModalPage implements OnInit {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  temporaryStoreImageURL: string;
  phoneNumberRegex = commonConfig.phoneNumberRegex;

  // NgModels
  selectedStoreBelongsToCompanyFlag = false;
  selectedCompany: Company;
  storeNameModel: string;
  storeContactNumModel: string;
  storeEmailModel: string;
  storeDescriptionModel: string;
  storeNoStreetNameModel: string;
  storePostCodeModel: string;
  storeCountryModel: string;
  storeStateModel: string;
  storeCityModel: string;

  // Numbers
  currentCompanyPageNumber = 1;
  currentCompanyPageSize = 10;
  companyMaximumPages: number;
  companyTotalResult: number;
  storeNameMinLength = 2;
  storeNameMaxLength = 40;
  storeContactNumMinLength = 11;
  storeContactNumMaxLength = 14;
  storeDescriptionMinLength = 10;
  storeDescriptionMaxLength = 100;
  storeNoStreetNameMaxLength = 200;
  storePostCodeMinLength = 5;
  storePostCodeMaxLength = 5;
  storeCountryMaxLength = 15;
  storeStateMaxLength = 15;
  storeCityMaxLength = 15;

  // Arrays
  listOfCompanies: Array<Company> = [];

  // ViewChilds
  @ViewChild('storeImageContainer', {static: false}) storeImageContainer: ElementRef;

  // Objects
  storeImageAsBlobArray: Array<Blob> = [];
  inventoryImageSliderOptions = {
    autoHeight: true,
    initialSlide: 0,
    speed: 400,
    noSwipingClass: 'no-swipe'
  };

  // FormGroup
  storeInfoFormGroup: FormGroup;
  storeAddressFormGroup: FormGroup;

  // Subscriptions
  appendListOfCompaniesSubscription: any;
  searchListOfCompaniesSubscription: any;
  createStoreSubscription: any;

  constructor(
      private ngZone: NgZone,
      private modalController: ModalController,
      private companyControllerService: CompanyControllerServiceService,
      private storeControllerService: StoreControllerServiceService,
      private loadingService: LoadingService,
      private globalFunctionService: GlobalfunctionService
  ) {
    console.log(this.constructorName + 'Initializing component');
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
    });
  }

  closeCreateStoreModal(returnFromCreatingStore: boolean) {
    this.modalController.dismiss(returnFromCreatingStore);
  }

  toggleBelongsToCompanyFlag() {
    this.selectedStoreBelongsToCompanyFlag = !this.selectedStoreBelongsToCompanyFlag;
    if (!this.selectedStoreBelongsToCompanyFlag) {
      this.selectedCompany = null;
    }
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

  createStore() {
    this.loadingService.present();
    this.createStoreSubscription = this.storeControllerService.createStore(
        this.storeNameModel,
        this.selectedStoreBelongsToCompanyFlag === true ? 1 : 0,
        this.selectedCompany ? this.selectedCompany.id : null,
        null,
        this.storeContactNumModel,
        this.storeDescriptionModel,
        this.storeEmailModel,
        this.storeNoStreetNameModel,
        this.storePostCodeModel,
        this.storeStateModel,
        this.storeCityModel,
        this.storeCountryModel,
        this.storeImageAsBlobArray
    ).subscribe(resp => {
      console.log(resp);
      if (resp.code === 200) {
        this.globalFunctionService.simpleToast('SUCCESS', 'Store has been successfully created!', 'success', 'top');
        this.closeCreateStoreModal(true);
      } else {
        // tslint:disable-next-line:max-line-length
        this.globalFunctionService.simpleToast('ERROR', 'Something went wrong while creating the Store, please try again later!', 'warning', 'top');
      }
      this.loadingService.dismiss();
    }, error => {
      console.log('API Error while creating a new store.');
      // tslint:disable-next-line:max-line-length
      this.globalFunctionService.simpleToast('ERROR', 'Something went wrong while creating the Store, please try again later!', 'warning', 'top');
      this.loadingService.dismiss();
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
    console.log('has infiinte scroll?');
    console.log(event.component.hasInfiniteScroll);
    console.log('search for companies');
    const text = event.text.trim().toLowerCase();
    event.component.startSearch();

    if (this.searchListOfCompaniesSubscription) {
      this.searchListOfCompaniesSubscription.unsubscribe();
    }
    this.currentCompanyPageNumber = 1;
    console.log('current pag enumber reset to 1');
    if (!text) {
      console.log('no text search');
      if (this.searchListOfCompaniesSubscription) {
        this.searchListOfCompaniesSubscription.unsubscribe();
      }
      this.searchListOfCompaniesSubscription = this.companyControllerService.getCompanies(
          this.currentCompanyPageNumber,
          this.currentCompanyPageSize
      ).subscribe(resp => {
        console.log('initial company list');
        console.log(resp);
        if (resp.code === 200) {
          this.listOfCompanies = resp.data;
          this.companyMaximumPages = resp.maximumPages;
          this.companyTotalResult = resp.totalResult;
          event.component.items = this.listOfCompanies;
        } else {
          this.listOfCompanies = [];
          this.companyMaximumPages = 0;
          this.companyTotalResult = 0;
        }
        // Enable and start infinite scroll from the beginning.
        event.component.endSearch();
        event.component.enableInfiniteScroll();
        this.retrieveMoreCompanies(event);
      }, error => {
        console.log('API error while retrieving list of companies.');
        console.log(error);
      });
      return;
    }
    console.log('got keyword:' + text);
    this.searchListOfCompaniesSubscription = this.companyControllerService.filterCompanies(
        this.currentCompanyPageNumber,
        this.currentCompanyPageSize,
        text
    ).subscribe(resp => {
      console.log('filter');
      console.log(resp);
      // Subscription will be closed when unsubscribed manually.
      if (this.searchListOfCompaniesSubscription.closed) {
        console.log('subscription closed');
        return;
      }
      if (resp.code === 200) {
        console.log('filter companies');
        this.listOfCompanies = this.filterCompanies(resp.data, text);
        console.log('search final list of company');
        console.log(this.listOfCompanies);
      }
      event.component.endSearch();
      event.component.enableInfiniteScroll();
    }, error => {
      console.log('API Error while retrieving filtered company list.');
      console.log(error);
    });
  }

  retrieveMoreCompanies(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    console.log('retrieve more');
    const text = (event.text || '').trim().toLowerCase();
    if (this.currentCompanyPageNumber > this.companyMaximumPages) {
      console.log('disabled infinite scroll');
      // event.component.disableInfiniteScroll();
      event.component.endInfiniteScroll();
      return;
    } else {
      console.log('increment page number in retrieve more');
      this.currentCompanyPageNumber++;
      console.log('current page number in retrieve: ' + this.currentCompanyPageNumber);
      if (text) {
        // console.log('got text in retrieve more');
        // this.listOfCompanies = this.filterCompanies(resp.data, text);
        this.appendListOfCompaniesSubscription = this.companyControllerService.filterCompanies(
            this.currentCompanyPageNumber,
            this.currentCompanyPageSize,
            text
        ).subscribe(resp => {
          if (resp.code === 200) {
            for (const company of resp.data) {
              this.listOfCompanies.push(company);
            }
            console.log('got text list of comapnies after event concat');
            console.log(this.listOfCompanies);
          } else {

          }
          event.component.items = this.listOfCompanies;
          console.log('final list of companies');
          console.log(this.listOfCompanies);
          event.component.endInfiniteScroll();
        }, error => {
          event.component.endInfiniteScroll();
        });
      } else {
        this.appendListOfCompaniesSubscription = this.companyControllerService.getCompanies(
            this.currentCompanyPageNumber,
            this.currentCompanyPageSize
        ).subscribe(resp => {
          if (resp.code === 200) {
            for (const company of resp.data) {
              this.listOfCompanies.push(company);
            }
            console.log('no text list of comapnies after event concat');
            console.log(this.listOfCompanies);
          } else {
            console.log('no companies is retrieved');
          }

          event.component.items = this.listOfCompanies;
          console.log('final list of companies');
          console.log(this.listOfCompanies);
          event.component.endInfiniteScroll();
        }, error => {
          console.log('API error while retrieving list of companies.');
          console.log(error);
          event.component.endInfiniteScroll();
        });
      }
    }
  }
}
