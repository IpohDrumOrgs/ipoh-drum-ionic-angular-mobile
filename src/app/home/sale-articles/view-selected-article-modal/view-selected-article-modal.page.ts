import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Article, ArticleControllerServiceService} from '../../../_dal/ipohdrum';
import {Comment} from '../../../_dal/ipohdrum/model/comment';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';
import {commonConfig} from '../../../_dal/common/commonConfig';

@Component({
  selector: 'app-view-selected-article-modal',
  templateUrl: './view-selected-article-modal.page.html',
  styleUrls: ['./view-selected-article-modal.page.scss'],
})

export class ViewSelectedArticleModalPage implements OnInit, OnDestroy {

  constructorName = '[' + this.constructor.name + ']';
  publicArticleUid: string;

  currentPageNumber = 1;
  currentPageSize = commonConfig.currentPageSize;
  maximumPages: number;
  totalResult: number;

  isLoadingSelectedArticleByUid = true;
  isLoadingCommentsBySelectedArticle = true;

  selectedPublicArticle: Article;
  referInfiniteScroll: any;
  articleImageSliderOptions = {
    autoHeight: true,
    initialSlide: 0,
    speed: 400
  };

  listOfCommentsOfSelectedPublicArticle: Array<Comment> = [];

  getSelectedPublicArticleByUidSubscription: any;
  getListOfCommentsByArticleSubscription: any;
  appendListOfCommentsByArticleSubscription: any;

  @ViewChild('panelForMoreComments', {static: false}) panelForMoreComments: ElementRef;

  constructor(
      private ngZone: NgZone,
      private modalController: ModalController,
      private articleControllerService: ArticleControllerServiceService,
      private globalFunctionService: GlobalfunctionService
  ) {}

  ngOnInit() {
    this.ngZone.run(() => {
        this.retrieveSelectedPublicArticleByUid();
        // this.retrieveListOfCommentsByArticle();
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
    setTimeout(() => {
      if (this.getSelectedPublicArticleByUidSubscription) {
        this.getSelectedPublicArticleByUidSubscription.unsubscribe();
      }
      this.getSelectedPublicArticleByUidSubscription = this.articleControllerService.getPublicArticleByUid(
          this.publicArticleUid
      ).subscribe(resp => {
        if (resp.code === 200) {
          this.selectedPublicArticle = resp.data;
        } else {
          this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve the Article, please try again later!', 'warning');
          this.closeViewSelectedArticleModal();
        }
        this.isLoadingSelectedArticleByUid = false;
      }, error => {
        this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve the Article, please try again later!', 'danger');
        this.isLoadingSelectedArticleByUid = false;
        this.closeViewSelectedArticleModal();
      });
    }, 500);
  }

/*  retrieveListOfCommentsByArticle() {
    this.isLoadingCommentsBySelectedArticle = true;
    if (this.getListOfCommentsByArticleSubscription) {
      this.getListOfCommentsByArticleSubscription.unsubscribe();
    }
    this.getListOfCommentsByArticleSubscription = this.articleControllerService.getPublicArticleComments(
        this.publicArticleUid,
        this.currentPageNumber,
        this.currentPageSize
    ).subscribe(resp => {
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
      this.isLoadingCommentsBySelectedArticle = false;
    }, error => {
      this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve Comments, please revisit the page later.', 'danger');
      this.isLoadingCommentsBySelectedArticle = false;
    });
  }*/

/*  loadMoreComments(event) {
    this.referInfiniteScroll = event;
    if (this.selectedPublicArticle.commentcount > 0) {
      setTimeout(() => {
        if (this.maximumPages > this.currentPageNumber) {
          this.currentPageNumber++;
          this.appendListOfCommentsByArticleSubscription = this.articleControllerService.getPublicArticleComments(
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
            this.referInfiniteScroll.target.complete();
          });
        }
        if (this.totalResult === this.listOfCommentsOfSelectedPublicArticle.length) {
          this.referInfiniteScroll.target.disabled = true;
        }
      }, 500);
    }
  }*/

  closeViewSelectedArticleModal() {
    this.modalController.dismiss();
  }
}
