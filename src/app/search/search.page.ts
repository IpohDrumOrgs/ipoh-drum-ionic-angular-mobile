import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {GlobalfunctionService} from '../_dal/common/services/globalfunction.service';
import {Article, ArticleControllerServiceService, Video, VideoControllerServiceService} from '../_dal/ipohdrum';
import {commonConfig} from '../_dal/common/commonConfig';
import {PlaySelectedVideoModalPage} from '../home/sale-videos/play-selected-video-modal/play-selected-video-modal.page';
import {ViewSelectedArticleModalPage} from '../home/sale-articles/view-selected-article-modal/view-selected-article-modal.page';
import {PlaySelectedMyVideoModalPage} from '../home/my-videos-collection/play-selected-my-video-modal/play-selected-my-video-modal.page';
import {AuthenticationService} from '../_dal/common/services/authentication.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit, OnDestroy {

    // Strings
    constructorName = '[' + this.constructor.name + ']';
    itemToSearch = 'Videos';
    searchedKeyword: string;

    // Numbers
    currentPublicVideoPageNumber = 1;
    currentPageSize = commonConfig.currentPageSize;
    publicVideoMaximumPages: number;
    publicVideoTotalResult: number;

    currentPublicArticlePageNumber = 1;
    publicArticleMaximumPages: number;
    publicArticleTotalResult: number;

    currentUserVideosPageNumber = 1;
    userVideoMaximumPages: number;
    userVideoTotalResult: number;

    // Booleans
    showLoadingSpinner = false;
    playSelectedVideoModalOpen = false;
    viewArticleModalOpen = false;
    playSelectedMyVideoModalOpen = false;

    // Arrays
    listOfPublicVideosResult: Array<Video> = [];
    listOfPublicArticlesResult: Array<Article> = [];
    listOfMyVideosResult: Array<Video> = [];

    // Objects
    referInfiniteScrollPublicVideo: any;
    referInfiniteScrollPublicArticle: any;
    referInfiniteScrollUserVideos: any;

    // Subscriptions
    backButtonSubscription: any;
    getListOfPublicVideosSubscription: any;
    getListOfPublicArticlesSubscription: any;
    getListOfUserVideosSubscription: any;
    appendListOfPublicVideosSubscription: any;
    appendListOfPublicArticlesSubscription: any;
    appendListOfUserVideosSubscription: any;

    constructor(
        private router: Router,
        private ngZone: NgZone,
        private globalFunctionService: GlobalfunctionService,
        private platform: Platform,
        private modalController: ModalController,
        private authenticationService: AuthenticationService,
        private videoControllerService: VideoControllerServiceService,
        private articleControllerService: ArticleControllerServiceService
    ) {}

    ngOnInit() {
    }

    ngOnDestroy() {
        this.unsubscribeSubscriptions();
    }

    ionViewDidEnter() {
        this.searchedKeyword = null;
        this.backButtonSubscription = this.platform.backButton.subscribe(() => {
            this.router.navigate(['ipoh-drum/home']).catch(reason => {
                this.globalFunctionService.simpleToast('ERROR', 'Something went wrong, please try again later!', 'danger');
            });
        });
    }

    ionViewWillLeave() {
        if (this.backButtonSubscription) {
            this.backButtonSubscription.unsubscribe();
        }
    }

    ionViewDidLeave() {
        this.unsubscribeSubscriptions();
    }

    unsubscribeSubscriptions() {
        this.ngZone.run(() => {
            if (this.getListOfPublicVideosSubscription) {
                this.getListOfPublicVideosSubscription.unsubscribe();
            }
            if (this.getListOfPublicArticlesSubscription) {
                this.getListOfPublicArticlesSubscription.unsubscribe();
            }
            if (this.getListOfUserVideosSubscription) {
                this.getListOfUserVideosSubscription.unsubscribe();
            }
            if (this.appendListOfPublicVideosSubscription) {
                this.appendListOfPublicVideosSubscription.unsubscribe();
            }
            if (this.appendListOfPublicArticlesSubscription) {
                this.appendListOfPublicArticlesSubscription.unsubscribe();
            }
            if (this.appendListOfUserVideosSubscription) {
                this.appendListOfUserVideosSubscription.unsubscribe();
            }
            this.resetSearchResult();
        });
    }

    searchKeywordInput() {
        this.showLoadingSpinner = true;
    }

    searchKeywordChange() {
        if (this.searchedKeyword && this.searchedKeyword !== '') {
            setTimeout(() => {
                if (this.itemToSearch.toString().toLowerCase() === 'videos') {
                    this.retrieveListOfPublicVideosByKeyword();
                } else if (this.itemToSearch.toString().toLowerCase() === 'articles') {
                    this.retrieveListOfPublicArticlesByKeyword();
                } else if (this.itemToSearch.toString().toLowerCase() === 'my videos') {
                    this.retrieveListOfUserVideosByKeyword();
                }
            }, 1000);
        } else {
            this.showLoadingSpinner = false;
            if (this.itemToSearch.toString().toLowerCase() === 'videos') {
                this.resetSearchResult();
            } else if (this.itemToSearch.toString().toLowerCase() === 'articles') {
                this.resetSearchResult();
            } else if (this.itemToSearch.toString().toLowerCase() === 'my videos') {
                this.resetSearchResult();
            }
        }
    }

    changedSearchItemDropdown(event: any) {
        this.itemToSearch = event.detail.value;
        if (this.itemToSearch.toString().toLowerCase() === 'my videos') {
            if (this.checkIfUserIsLoggedIn()) {
                this.showLoadingSpinner = true;
                this.searchKeywordChange();
            } else {
                this.globalFunctionService.presentAlertConfirm(
                    'WARNING',
                    'You must be logged in to access My Video collections.',
                    'Cancel',
                    'Login',
                    () => this.cancelNotToLogin(),
                    () => this.navigateToLoginPage()
                );
            }
        } else {
            this.itemToSearch = event.detail.value;
            this.showLoadingSpinner = true;
            this.searchKeywordChange();
        }
    }

    cancelNotToLogin() {
        this.itemToSearch = 'Videos';
        this.resetSearchResult();
    }

    navigateToLoginPage() {
        this.router.navigate(['login']).catch(reason => {
            this.globalFunctionService.simpleToast('ERROR', 'Something went wrong, please try again later!', 'danger');
        });
    }

    resetSearchResult() {
        this.searchedKeyword = '';

        this.listOfPublicVideosResult = [];
        this.publicVideoMaximumPages = 0;
        this.publicVideoTotalResult = 0;
        if (this.referInfiniteScrollPublicVideo) {
            this.referInfiniteScrollPublicVideo.target.disabled = false;
        }

        this.listOfPublicArticlesResult = [];
        this.publicArticleMaximumPages = 0;
        this.publicArticleTotalResult = 0;
        if (this.referInfiniteScrollPublicArticle) {
            this.referInfiniteScrollPublicArticle.target.disabled = false;
        }

        this.listOfMyVideosResult = [];
        this.userVideoMaximumPages = 0;
        this.userVideoTotalResult = 0;
        if (this.referInfiniteScrollUserVideos) {
            this.referInfiniteScrollUserVideos.target.disabled = false;
        }
    }

    checkIfUserIsLoggedIn() {
        return this.authenticationService.isUserLoggedIn();
    }


    retrieveListOfPublicVideosByKeyword() {
        if (this.getListOfPublicVideosSubscription) {
            this.getListOfPublicVideosSubscription.unsubscribe();
        }
        this.currentPublicVideoPageNumber = 1;
        this.getListOfPublicVideosSubscription = this.videoControllerService.filterPublicVideos(
            this.currentPublicVideoPageNumber,
            this.currentPageSize,
            this.searchedKeyword
        ).subscribe(resp => {
            if (resp.code === 200) {
                this.listOfPublicVideosResult = resp.data;
                this.publicVideoMaximumPages = resp.maximumPages;
                this.publicVideoTotalResult = resp.totalResult;

                this.listOfPublicArticlesResult = [];
                this.publicArticleMaximumPages = 0;
                this.publicArticleTotalResult = 0;

                this.listOfMyVideosResult = [];
                this.userVideoMaximumPages = 0;
                this.userVideoTotalResult = 0;
            } else {
                this.resetSearchResult();
            }
            this.showLoadingSpinner = false;
        }, error => {
            this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve list of Videos, please try again later!', 'warning');
            this.showLoadingSpinner = false;
            this.resetSearchResult();
        });
    }

    async openModalToPlaySelectedVideo(publicVideoUid) {
        if (!this.playSelectedVideoModalOpen) {
            this.playSelectedVideoModalOpen = true;
            const modal = await this.modalController.create({
                component: PlaySelectedVideoModalPage,
                componentProps: {
                    publicVideoUid
                }
            });
            modal.onDidDismiss().then(() => {
                this.playSelectedVideoModalOpen = false;
            });
            return await modal.present();
        }
    }

    loadMorePublicVideos(event) {
        this.referInfiniteScrollPublicVideo = event;
        setTimeout(() => {
            if (this.publicVideoMaximumPages > this.currentPublicVideoPageNumber) {
                this.currentPublicVideoPageNumber++;
                this.appendListOfPublicVideosSubscription = this.videoControllerService.filterPublicVideos(
                    this.currentPublicVideoPageNumber,
                    this.currentPageSize,
                    this.searchedKeyword
                ).subscribe(resp => {
                    if (resp.code === 200) {
                        for (const tempPublicVideo of resp.data) {
                            this.listOfPublicVideosResult.push(tempPublicVideo);
                        }
                    }
                    this.referInfiniteScrollPublicVideo.target.complete();
                }, error => {
                    this.referInfiniteScrollPublicVideo.target.complete();
                });
            }
            if (this.publicVideoTotalResult === this.listOfPublicVideosResult.length) {
                this.referInfiniteScrollPublicVideo.target.disabled = true;
            }
        }, 500);
    }


    retrieveListOfPublicArticlesByKeyword() {
        if (this.getListOfPublicArticlesSubscription) {
            this.getListOfPublicArticlesSubscription.unsubscribe();
        }
        this.currentPublicArticlePageNumber = 1;
        this.getListOfPublicArticlesSubscription = this.articleControllerService.filterPublicArticles(
            this.currentPublicArticlePageNumber,
            this.currentPageSize,
            this.searchedKeyword
        ).subscribe(resp => {
            if (resp.code === 200) {
                this.listOfPublicArticlesResult = resp.data;
                this.publicArticleMaximumPages = resp.maximumPages;
                this.publicArticleTotalResult = resp.totalResult;

                this.listOfPublicVideosResult = [];
                this.publicVideoMaximumPages = 0;
                this.publicVideoTotalResult = 0;

                this.listOfMyVideosResult = [];
                this.userVideoMaximumPages = 0;
                this.userVideoTotalResult = 0;
            } else {
                this.resetSearchResult();
            }
            this.showLoadingSpinner = false;
        }, error => {
            this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve list of Articles, please try again later!', 'warning');
            this.showLoadingSpinner = false;
            this.resetSearchResult();
        });
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

    loadMorePublicArticles(event) {
        this.referInfiniteScrollPublicArticle = event;
        setTimeout(() => {
            if (this.publicArticleMaximumPages > this.currentPublicArticlePageNumber) {
                this.currentPublicArticlePageNumber++;
                this.appendListOfPublicArticlesSubscription = this.articleControllerService.filterPublicArticles(
                    this.currentPublicArticlePageNumber,
                    this.currentPageSize,
                    this.searchedKeyword
                ).subscribe(resp => {
                    if (resp.code === 200) {
                        for (const tempPublicArticle of resp.data) {
                            this.listOfPublicArticlesResult.push(tempPublicArticle);
                        }
                    }
                    this.referInfiniteScrollPublicArticle.target.complete();
                }, error => {
                    this.referInfiniteScrollPublicArticle.target.complete();
                });
            }
            if (this.publicArticleTotalResult === this.listOfPublicArticlesResult.length) {
                this.referInfiniteScrollPublicArticle.target.disabled = true;
            }
        }, 500);
    }


    retrieveListOfUserVideosByKeyword() {
      if (this.getListOfUserVideosSubscription) {
          this.getListOfUserVideosSubscription.unsubscribe();
      }
      this.currentUserVideosPageNumber = 1;
      this.getListOfUserVideosSubscription = this.videoControllerService.filterUserVideos(
          this.currentUserVideosPageNumber,
          this.currentPageSize,
          this.searchedKeyword
      ).subscribe(resp => {
          if (resp.code === 200) {
              this.listOfMyVideosResult = resp.data;
              this.userVideoMaximumPages = resp.maximumPages;
              this.userVideoTotalResult = resp.totalResult;

              this.listOfPublicVideosResult = [];
              this.publicVideoMaximumPages = 0;
              this.publicVideoTotalResult = 0;

              this.listOfPublicArticlesResult = [];
              this.publicArticleMaximumPages = 0;
              this.publicArticleTotalResult = 0;
          } else {
              this.resetSearchResult();
          }
          this.showLoadingSpinner = false;
      }, error => {
          // tslint:disable-next-line:max-line-length
          this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve list of My Video collection, please try again later!', 'warning');
          this.showLoadingSpinner = false;
          this.resetSearchResult();
      });
    }

    async openModalToPlaySelectedMyVideo(myVideoUid: string) {
        if (!this.playSelectedMyVideoModalOpen) {
            this.playSelectedMyVideoModalOpen = true;
            const modal = await this.modalController.create({
                component: PlaySelectedMyVideoModalPage,
                componentProps: {
                    myVideoUid
                }
            });
            modal.onDidDismiss().then(() => {
                this.playSelectedMyVideoModalOpen = false;
            });
            return await modal.present();
        }
    }

    loadMoreUserVideos(event) {
        this.referInfiniteScrollUserVideos = event;
        setTimeout(() => {
            if (this.userVideoMaximumPages > this.currentUserVideosPageNumber) {
                this.currentUserVideosPageNumber++;
                this.appendListOfUserVideosSubscription = this.videoControllerService.filterUserVideos(
                    this.currentUserVideosPageNumber,
                    this.currentPageSize,
                    this.searchedKeyword
                ).subscribe(resp => {
                    if (resp.code === 200) {
                        for (const tempUserVideo of resp.data) {
                            this.listOfMyVideosResult.push(tempUserVideo);
                        }
                    }
                    this.referInfiniteScrollUserVideos.target.complete();
                }, error => {
                    this.referInfiniteScrollUserVideos.target.complete();
                });
            }
            if (this.userVideoTotalResult === this.listOfMyVideosResult.length) {
                this.referInfiniteScrollUserVideos.target.disabled = true;
            }
        }, 500);
    }
}
