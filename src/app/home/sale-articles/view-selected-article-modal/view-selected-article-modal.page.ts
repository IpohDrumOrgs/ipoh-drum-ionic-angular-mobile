import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Article, ArticleControllerServiceService} from '../../../_dal/ipohdrum';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';

@Component({
  selector: 'app-view-selected-article-modal',
  templateUrl: './view-selected-article-modal.page.html',
  styleUrls: ['./view-selected-article-modal.page.scss'],
})

export class ViewSelectedArticleModalPage implements OnInit, OnDestroy {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  publicArticleUid: string;

  // Booleans
  isLoadingSelectedArticleByUid = true;

  // Objects
  selectedPublicArticle: Article;

  // Subscriptions
  getSelectedPublicArticleByUidSubscription: any;

  constructor(
      private ngZone: NgZone,
      private modalController: ModalController,
      private articleControllerService: ArticleControllerServiceService,
      private globalFunctionService: GlobalfunctionService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {
        this.retrieveSelectedPublicArticleByUid();
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
      if (this.getSelectedPublicArticleByUidSubscription) {
        this.getSelectedPublicArticleByUidSubscription.unsubscribe();
      }
    });
  }

  retrieveSelectedPublicArticleByUid() {
    console.log('get selected article');
    this.isLoadingSelectedArticleByUid = true;
    if (this.getSelectedPublicArticleByUidSubscription) {
      this.getSelectedPublicArticleByUidSubscription.unsubscribe();
    }
    this.getSelectedPublicArticleByUidSubscription = this.articleControllerService.getPublicArticleByUid(
        this.publicArticleUid
    ).subscribe(resp => {
      console.log(resp);
      if (resp.code === 200) {
        this.selectedPublicArticle = resp.data;
      } else {
        this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve the Article, please try again later!', 'danger');
        this.closeViewSelectedArticleModal();
      }
      this.isLoadingSelectedArticleByUid = false;
    }, error => {
      console.log('API Error while retrieving public article by uid.');
      this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve the Article, please try again later!', 'danger');
      this.isLoadingSelectedArticleByUid = false;
      this.closeViewSelectedArticleModal();
    });
  }

  async closeViewSelectedArticleModal() {
    await this.modalController.dismiss();
  }
}
