import {ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';
import {BloggerControllerServiceService, Company, CompanyControllerServiceService} from '../../../_dal/ipohdrum';
import {Blogger} from '../../../_dal/ipohdrum/model/blogger';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingService} from '../../../_dal/common/services/loading.service';
import {commonConfig} from '../../../_dal/common/commonConfig';
import {IonicSelectableComponent} from 'ionic-selectable';

@Component({
  selector: 'app-edit-blog-modal',
  templateUrl: './edit-blog-modal.page.html',
  styleUrls: ['./edit-blog-modal.page.scss'],
})

export class EditBlogModalPage implements OnInit, OnDestroy {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  selectedBloggerUid: string;

  // Numbers
  currentPageNumber = 1;
  currentPageSize = 10;
  maximumPages: number;
  totalResult: number;
  blogNameMinLength = commonConfig.blogNameMinLength;
  blogNameMaxLength = commonConfig.blogNameMaxLength;
  blogDescriptionMinLength = commonConfig.blogDescriptionMinLength;
  blogDescriptionMaxLength = commonConfig.blogDescriptionMaxLength;

  // Booleans
  isLoadingBloggerInfo = true;
  companyBelongingsFlag = false;

  // ViewChilds
  @ViewChild('bloggerImageContainer', {static: false}) bloggerImageContainer: ElementRef;

  // Arrays
  bloggerImageAsBlobArray: Array<Blob> = [];
  listOfCompanies: Array<Company> = [];

  // Objects
  selectedBlogger: Blogger;
  temporaryStoreImageURL: Blob;

  // FormGroups
  blogInfoFormGroup: FormGroup;

  // Subscriptions
  getBloggerSubscription: any;
  updateBloggerSubscription: any;
  searchListOfCompaniesSubscription: any;
  appendListOfCompaniesSubscription: any;
  deleteBloggerSubscription: any;

  constructor(
      private ref: ChangeDetectorRef,
      private ngZone: NgZone,
      private globalFunctionService: GlobalfunctionService,
      private bloggerControllerService: BloggerControllerServiceService,
      private modalController: ModalController,
      private loadingService: LoadingService,
      private companyControllerService: CompanyControllerServiceService
  ) {
    console.log(this.constructorName + 'Initializing component');
    this.loadingService.present();
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.blogInfoFormGroup = new FormGroup({
        blogName: new FormControl(null, [
          Validators.required,
          Validators.minLength(this.blogNameMinLength),
          Validators.maxLength(this.blogNameMaxLength)
        ]),
        blogDescription: new FormControl(null, [
          Validators.required,
          Validators.minLength(this.blogDescriptionMinLength),
          Validators.maxLength(this.blogDescriptionMaxLength)
        ]),
        blogEmail: new FormControl(null, [
          Validators.required,
          Validators.email
        ]),
        blogCompanyBelongings: new FormControl(),
        blogSelectedStore: new FormControl()
      });
      this.getBloggerSubscription = this.bloggerControllerService.getBloggerByUid(
          this.selectedBloggerUid
      ).subscribe(resp => {
        console.log(resp);
        if (resp.code === 200) {
          this.selectedBlogger = resp.data;
          this.companyBelongingsFlag = resp.data.companyBelongings === 1;
        } else {
          // tslint:disable-next-line:max-line-length
          this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Blogger\'s info, please try again later!', 'warning', 'top');
          this.closeEditBlogModal(false);
        }
        this.isLoadingBloggerInfo = false;
        this.loadingService.dismiss();
        this.ref.detectChanges();
      }, error => {
        console.log('API Error while retrieving Blogger by uid.');
        console.log(error);
        this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Blogger\'s info, please try again later!', 'warning', 'top');
        this.isLoadingBloggerInfo = false;
        this.loadingService.dismiss();
        this.closeEditBlogModal(false);
        this.ref.detectChanges();
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
      if (this.updateBloggerSubscription) {
        this.updateBloggerSubscription.unsubscribe();
      }
      if (this.getBloggerSubscription) {
        this.getBloggerSubscription.unsubscribe();
      }
      if (this.deleteBloggerSubscription) {
        this.deleteBloggerSubscription.unsubscribe();
      }
    });
  }

  closeEditBlogModal(returnFromEditingBlog: boolean) {
    this.modalController.dismiss(returnFromEditingBlog);
  }

  openBloggerImageFilePicker() {
    this.bloggerImageContainer.nativeElement.click();
  }

  uploadBloggerImage(event) {
    const files = event.target.files;
    if (files.length) {
      if (files[0].type.toString().includes('image')) {
        // Actual Blob File
        this.bloggerImageAsBlobArray[0] = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // Some URL for displaying purpose only
          this.temporaryStoreImageURL = e.target.result;
        };
        reader.readAsDataURL(files[0]);
      }
    }
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

  updateBlogger() {
    console.log('update blogger');
    this.loadingService.present();
    this.updateBloggerSubscription = this.bloggerControllerService.updateBloggerByUid(
        this.selectedBloggerUid,
        this.selectedBlogger.name,
        this.companyBelongingsFlag ? 1 : 0,
        null,
        this.companyBelongingsFlag ? this.selectedBlogger.company.id : null,
        this.selectedBlogger.desc,
        this.selectedBlogger.email,
        null,
        this.bloggerImageAsBlobArray[0] !== undefined || this.bloggerImageAsBlobArray[0] !== null ? this.bloggerImageAsBlobArray : null
    ).subscribe(resp => {
      console.log(resp);
      if (resp.code === 200) {
        this.globalFunctionService.simpleToast('SUCCESS', 'Blogger has been updated.', 'success', 'top');
        this.closeEditBlogModal(true);
      } else {
        this.globalFunctionService.simpleToast('ERROR', 'Unable to update the Blogger, please try again later!', 'danger', 'top');
      }
      this.loadingService.dismiss();
    }, error => {
      console.log('API Error while updating the Blogger by uid.');
      console.log(error);
      this.globalFunctionService.simpleToast('ERROR', 'Unable to update the Blogger, please try again later!', 'danger', 'top');
      this.loadingService.dismiss();
    });
  }

  deleteBlogger() {
    this.globalFunctionService.presentAlertConfirm(
        'WARNING',
        'Are you sure you want to delete the selected Blogger?',
        'Cancel',
        'Confirm',
        undefined,
        () => this.actuallyDeleteBlogger()
    );
  }

  actuallyDeleteBlogger() {
    this.loadingService.present();
    if (this.deleteBloggerSubscription) {
      this.deleteBloggerSubscription.unsubscribe();
    }
    this.deleteBloggerSubscription = this.bloggerControllerService.deleteBloggerByUid(
        this.selectedBloggerUid
    ).subscribe(resp => {
      if (resp.code === 200) {
        this.globalFunctionService.simpleToast('SUCCESS', 'The Blogger has been deleted!', 'success');
        this.closeEditBlogModal(true);
      } else {
        this.globalFunctionService.simpleToast('ERROR', 'Unable to delete the Blogger, please try again later!', 'danger');
      }
      this.loadingService.dismiss();
    }, error => {
      console.log('API Error while deleting the blogger');
      console.log(error);
      this.loadingService.dismiss();
      this.globalFunctionService.simpleToast('ERROR', 'Unable to delete the Blogger, please try again later!', 'danger');
    });
  }
}
