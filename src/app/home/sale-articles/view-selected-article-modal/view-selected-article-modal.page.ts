import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Article, ArticleControllerServiceService} from '../../../_dal/ipohdrum';
import {Comment} from '../../../_dal/ipohdrum/model/comment';
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

  // Numbers
  currentPageNumber = 1;
  currentPageSize = 10;
  maximumPages: number;
  totalResult: number;

  // Booleans
  isLoadingSelectedArticleByUid = true;

  // Objects
  selectedPublicArticle: Article;
  referInfiniteScroll: any;
  articleImageSliderOptions = {
    autoHeight: true,
    initialSlide: 0,
    speed: 400
  };

  // Arrays
  listOfCommentsOfSelectedPublicArticle: Array<Comment> = [];

  // Subscriptions
  getSelectedPublicArticleByUidSubscription: any;
  getListOfCommentsByArticleSubscription: any;
  appendListOfCommentsByArticleSubscription: any;

  @ViewChild('panelForMoreComments', {static: false}) panelForMoreComments: ElementRef;

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
        this.retrieveListOfCommentsByArticle();
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
      if (this.getListOfCommentsByArticleSubscription) {
        this.getListOfCommentsByArticleSubscription.unsubscribe();
      }
      if (this.appendListOfCommentsByArticleSubscription) {
        this.appendListOfCommentsByArticleSubscription.unsubscribe();
      }
    });
  }

  retrieveSelectedPublicArticleByUid() {
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

  retrieveListOfCommentsByArticle() {
    if (this.getListOfCommentsByArticleSubscription) {
      this.getListOfCommentsByArticleSubscription.unsubscribe();
    }
    this.getListOfCommentsByArticleSubscription = this.articleControllerService.getPublicComments(
        this.publicArticleUid,
        this.currentPageNumber,
        this.currentPageSize
    ).subscribe(resp => {
      console.log(resp);
      if (resp.code === 200) {
        this.listOfCommentsOfSelectedPublicArticle = resp.data;
        this.maximumPages = resp.maximumPages;
        this.totalResult = resp.totalResult;
      } else {
        this.listOfCommentsOfSelectedPublicArticle = [];
        this.maximumPages = 0;
        this.totalResult = 0;
        this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Comments, please revisit the page later.', 'warning');
      }
    }, error => {
      console.log('API Error while retrieving list of comments by Article');
      this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Comments, please revisit the page later.', 'warning');
    });
  }

  loadMoreComments(event) {
    this.referInfiniteScroll = event;
    setTimeout(() => {
      if (this.maximumPages > this.currentPageNumber) {
        this.currentPageNumber++;
        this.appendListOfCommentsByArticleSubscription = this.articleControllerService.getPublicComments(
            this.publicArticleUid,
            this.currentPageNumber,
            this.currentPageSize
        ).subscribe(resp => {
          if (resp.code === 200) {
            for (const tempComment of resp.data) {
              this.listOfCommentsOfSelectedPublicArticle.push(tempComment);
            }
          }
          this.referInfiniteScroll.target.complete();
        }, error => {
          console.log('API Error while retrieving list of comments');
          this.referInfiniteScroll.target.complete();
        });
      }
      if (this.totalResult === this.listOfCommentsOfSelectedPublicArticle.length) {
        this.referInfiniteScroll.target.disabled = true;
      }
    }, 500);
  }

  closeViewSelectedArticleModal() {
    this.modalController.dismiss();
  }
}