import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Article, ArticleControllerServiceService} from '../../_dal/ipohdrum';
import {LoadingService} from '../../_dal/common/services/loading.service';
import {GlobalfunctionService} from '../../_dal/common/services/globalfunction.service';

@Component({
  selector: 'app-sale-articles',
  templateUrl: './sale-articles.component.html',
  styleUrls: ['./sale-articles.component.scss'],
})

export class SaleArticlesComponent implements OnInit, OnDestroy {

  // Strings
  constructorName = '[' + this.constructor.name + ']';

  // Numbers
  currentPageNumber = 1;
  currentPageSize = 10;
  maximumPages: number;
  totalResult: number;

  // Booleans
  isLoadingListOfPublicArticles = true;

  // Arrays
  listOfPublicArticles: Array<Article> = [];

  // Subscriptions
  getListOfArticlesSubscription: any;

  constructor(
      private ngZone: NgZone,
      private loadingService: LoadingService,
      private globalFunctionService: GlobalfunctionService,
      private articleControllerService: ArticleControllerServiceService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

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
    });
  }

  retrieveListOfArticles() {
    this.isLoadingListOfPublicArticles = true;
    if (this.getListOfArticlesSubscription) {
      this.getListOfArticlesSubscription.unsubscribe();
    }
    this.getListOfArticlesSubscription = this.articleControllerService.getPublicArticlesListing(
        this.currentPageNumber,
        this.currentPageSize
    ).subscribe(resp => {
      console.log(resp);
      if (resp.code === 200) {
        this.listOfPublicArticles = resp.data;
        this.maximumPages = resp.maximumPages;
        this.totalResult = resp.totalResult;
      } else {
        this.listOfPublicArticles = [];
        this.maximumPages = 0;
        this.totalResult = 0;
      }
      this.isLoadingListOfPublicArticles = false;
    }, error => {
      console.log('API Error while retrieving list of public articles');
      this.isLoadingListOfPublicArticles = false;
      this.listOfPublicArticles = [];
    });
  }
}
