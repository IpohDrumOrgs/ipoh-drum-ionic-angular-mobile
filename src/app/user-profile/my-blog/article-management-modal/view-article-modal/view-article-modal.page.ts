import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Article, ArticleControllerServiceService} from '../../../../_dal/ipohdrum';
import {GlobalfunctionService} from '../../../../_dal/common/services/globalfunction.service';

@Component({
  selector: 'app-view-article-modal',
  templateUrl: './view-article-modal.page.html',
  styleUrls: ['./view-article-modal.page.scss'],
})

export class ViewArticleModalPage implements OnInit, OnDestroy {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  selectedArticleUid: string;

  // Numbers
  selectedArticleId: number;

  // Booleans
  isLoadingArticleInfo = true;
  isArticlePublicScope = false;

  // Objects
  selectedArticle: Article;
  articleImageSliderOptions = {
    autoHeight: true,
    initialSlide: 0,
    speed: 400
  };

  // Subscriptions
  getSelectedArticleByUidSubscription: any;

  constructor(
      private ngZone: NgZone,
      private modalController: ModalController,
      private globalFunctionService: GlobalfunctionService,
      private articleControllerService: ArticleControllerServiceService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.retrieveSelectedArticleByUid();
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
      if (this.getSelectedArticleByUidSubscription) {
        this.getSelectedArticleByUidSubscription.unsubscribe();
      }
    });
  }

  retrieveSelectedArticleByUid() {
    console.log('selected article');
    this.isLoadingArticleInfo = true;
    if (this.getSelectedArticleByUidSubscription) {
      this.getSelectedArticleByUidSubscription.unsubscribe();
    }
    this.getSelectedArticleByUidSubscription = this.articleControllerService.getArticleByUid(
        this.selectedArticleUid
    ).subscribe(resp => {
      console.log(resp);
      if (resp.code === 200) {
        this.selectedArticle = resp.data;
        this.selectedArticle.scope === 'public' ? this.isArticlePublicScope = true : this.isArticlePublicScope = false;
      } else {
        this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve Article info, please try again later!', 'danger');
        this.closeViewArticleModal();
      }
      this.isLoadingArticleInfo = false;
    }, error => {
      console.log('API Error while retrieving selected Article by uid.');
      console.log(error);
      this.isLoadingArticleInfo = false;
      this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve Article info, please try again later!', 'danger');
      this.closeViewArticleModal();
    });
  }

  closeViewArticleModal() {
    this.modalController.dismiss();
  }
}
