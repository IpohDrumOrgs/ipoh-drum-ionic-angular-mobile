import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {BloggerControllerServiceService, Store} from '../../../_dal/ipohdrum';
import {Blogger} from '../../../_dal/ipohdrum/model/blogger';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';
import {ModalController} from '@ionic/angular';
import {EditBlogModalPage} from '../edit-blog-modal/edit-blog-modal.page';

@Component({
  selector: 'app-view-blog-modal',
  templateUrl: './view-blog-modal.page.html',
  styleUrls: ['./view-blog-modal.page.scss'],
})

export class ViewBlogModalPage implements OnInit, OnDestroy {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  selectedBloggerUid: string;

  // Booleans
  isLoadingBloggerInfo = true;
  companyBelongingsFlag = false;

  // Objects
  selectedBlogger: Blogger;

  // Subscriptions
  getSelectedBloggerByUidSubscription: any;

  constructor(
      private ref: ChangeDetectorRef,
      private ngZone: NgZone,
      private bloggerControllerService: BloggerControllerServiceService,
      private globalFunctionService: GlobalfunctionService,
      private modalController: ModalController
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.retrieveSelectedBloggerByUid();
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
      if (this.getSelectedBloggerByUidSubscription) {
        this.getSelectedBloggerByUidSubscription.unsubscribe();
      }
    });
  }

  retrieveSelectedBloggerByUid() {
    this.isLoadingBloggerInfo = true;
    if (this.getSelectedBloggerByUidSubscription) {
      this.getSelectedBloggerByUidSubscription.unsubscribe();
    }
    this.getSelectedBloggerByUidSubscription = this.bloggerControllerService.getBloggerByUid(
        this.selectedBloggerUid
    ).subscribe(resp => {
      if (resp.code === 200) {
        this.selectedBlogger = resp.data;
        this.companyBelongingsFlag = resp.data.companyBelongings === 1;
      } else {
        this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve Blogger info, please try again later!', 'danger');
        this.closeViewBloggerModal();
      }
      this.isLoadingBloggerInfo = false;
      this.ref.detectChanges();
    }, error => {
      console.log('API Error while retriving selected Blogger by uid.');
      console.log(error);
      this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve Blogger info, please try again later!', 'danger');
      this.closeViewBloggerModal();
      this.isLoadingBloggerInfo = false;
      this.ref.detectChanges();
    });
  }

  closeViewBloggerModal() {
    this.modalController.dismiss();
  }

  async openEditBloggerModal() {
    const modal = await this.modalController.create({
      component: EditBlogModalPage,
      componentProps: {
        selectedBloggerUid: this.selectedBloggerUid
      }
    });
    modal.onDidDismiss().then((returnFromEditingBlog) => {
      if (returnFromEditingBlog.data) {
        this.retrieveSelectedBloggerByUid();
      }
    });
    return await modal.present();
  }
}
