import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Article, ArticleControllerServiceService} from '../../_dal/ipohdrum';
import {LoadingService} from '../../_dal/common/services/loading.service';
import {GlobalfunctionService} from '../../_dal/common/services/globalfunction.service';
import {ModalController} from '@ionic/angular';
import {ViewSelectedArticleModalPage} from './view-selected-article-modal/view-selected-article-modal.page';
import {commonConfig} from '../../_dal/common/commonConfig';

@Component({
  selector: 'app-sale-articles',
  templateUrl: './sale-articles.component.html',
  styleUrls: ['./sale-articles.component.scss'],
})

export class SaleArticlesComponent implements OnInit, OnDestroy {

  constructorName = '[' + this.constructor.name + ']';

  currentPageNumber = 1;
  currentPageSize = commonConfig.currentPageSize;
  maximumPages: number;
  totalResult: number;

  isLoadingListOfPublicArticles = true;
  viewArticleModalOpen = false;

  listOfPublicArticles: Array<Article> = [];

  referInfiniteScroll: any;

  getListOfArticlesSubscription: any;
  appendListOfArticlesSubscription: any;

  constructor(
      private modalController: ModalController,
      private ngZone: NgZone,
      private loadingService: LoadingService,
      private globalFunctionService: GlobalfunctionService,
      private articleControllerService: ArticleControllerServiceService
  ) {}

  ngOnInit() {
    this.ngZone.run(() => {
      this.retrieveListOfArticles();
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
      if (this.getListOfArticlesSubscription) {
        this.getListOfArticlesSubscription.unsubscribe();
      }
      if (this.appendListOfArticlesSubscription) {
        this.appendListOfArticlesSubscription.unsubscribe();
      }
    });
  }

  retrieveListOfArticles() {
    this.loadingService.present();
    setTimeout(() => {
      this.isLoadingListOfPublicArticles = true;
      if (this.getListOfArticlesSubscription) {
        this.getListOfArticlesSubscription.unsubscribe();
      }
      this.currentPageNumber = 1;
      this.getListOfArticlesSubscription = this.articleControllerService.getPublicArticles(
          this.currentPageNumber,
          this.currentPageSize
      ).subscribe(resp => {
        if (resp.code === 200) {
          this.listOfPublicArticles = resp.data;
          this.maximumPages = resp.maximumPages;
          this.totalResult = resp.totalResult;
        } else {
          this.listOfPublicArticles = [];
          this.maximumPages = 0;
          this.totalResult = 0;
          this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Articles, please try again later!', 'warning', 'top');
        }
        this.loadingService.dismiss();
        this.isLoadingListOfPublicArticles = false;
      }, error => {
        this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve Articles, please try again later!', 'danger', 'top');
        this.isLoadingListOfPublicArticles = false;
        this.listOfPublicArticles = [];
        this.loadingService.dismiss();
      });
    }, 500);
  }

  ionRefresh(event) {
    if (this.referInfiniteScroll) {
      this.referInfiniteScroll.target.disabled = false;
    }
    if (this.getListOfArticlesSubscription) {
      this.getListOfArticlesSubscription.unsubscribe();
    }
    this.currentPageNumber = 1;
    this.getListOfArticlesSubscription = this.articleControllerService.getPublicArticles(
        this.currentPageNumber,
        this.currentPageSize
    ).subscribe(resp => {
      if (resp.code === 200) {
        this.listOfPublicArticles = resp.data;
        this.maximumPages = resp.maximumPages;
        this.totalResult = resp.totalResult;
      } else {
        this.listOfPublicArticles = [];
        // tslint:disable-next-line:max-line-length
        this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Articles, please try again later!', 'warning', 'top');
      }
      event.target.complete();
    }, error => {
      // tslint:disable-next-line:max-line-length
      this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve Articles, please try again later!', 'danger', 'top');
      this.listOfPublicArticles = [];
      event.target.complete();
    });
  }

  loadMoreArticles(event) {
    this.referInfiniteScroll = event;
    setTimeout(() => {
      if (this.maximumPages > this.currentPageNumber) {
        this.currentPageNumber++;
        this.appendListOfArticlesSubscription = this.articleControllerService.getPublicArticles(
            this.currentPageNumber,
            this.currentPageSize
        ).subscribe(resp => {
          if (resp.code === 200) {
            for (const tempPublicArticle of resp.data) {
              this.listOfPublicArticles.push(tempPublicArticle);
            }
          }
          this.referInfiniteScroll.target.complete();
        }, error => {
          this.referInfiniteScroll.target.complete();
        });
      }
      if (this.totalResult === this.listOfPublicArticles.length) {
        this.referInfiniteScroll.target.disabled = true;
      }
    }, 500);
  }

  async openSelectedArticleInModal(publicArticleUid: string) {
    if (!this.viewArticleModalOpen) {
      this.viewArticleModalOpen = true;
      const modal = await this.modalController.create({
        component: ViewSelectedArticleModalPage,
        componentProps: {
          publicArticleUid
        }
      });
      modal.onDidDismiss().then(() => {
        this.viewArticleModalOpen = false;
      });
      return await modal.present();
    }
  }
}
