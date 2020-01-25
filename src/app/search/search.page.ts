import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalfunctionService} from '../_dal/common/services/globalfunction.service';
import {Article, ArticleControllerServiceService, Video, VideoControllerServiceService} from '../_dal/ipohdrum';
import {commonConfig} from '../_dal/common/commonConfig';
import {PlaySelectedVideoModalPage} from '../home/sale-videos/play-selected-video-modal/play-selected-video-modal.page';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit, OnDestroy {

    // Strings
    constructorName = '[' + this.constructor.name + ']';
    itemToSearch: string;
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

    // Arrays
    listOfPublicVideosResult: Array<Video> = [];
    listOfPublicArticlesResult: Array<Article> = [];
    listOfMyVideosResult: Array<Video> = [];

    // Objects
    referInfiniteScrollPublicVideo: any;

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
        private route: ActivatedRoute,
        private ngZone: NgZone,
        private globalFunctionService: GlobalfunctionService,
        private platform: Platform,
        private modalController: ModalController,
        private videoControllerService: VideoControllerServiceService,
        private articleControllerService: ArticleControllerServiceService
    ) {
        console.log(this.constructorName + 'Initializing component');
    }

    ngOnInit() {
        this.ngZone.run(() => {
            this.route.params.subscribe(params => {
                this.itemToSearch = params.item;
            });
        });
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
        });
    }

    searchKeywordInput() {
        this.showLoadingSpinner = true;
    }

    searchKeywordChange() {
        if (this.searchedKeyword && this.searchedKeyword !== '') {
            setTimeout(() => {
                if (this.itemToSearch === 'videos') {
                    this.retrieveListOfPublicVideosByKeyword();
                } else if (this.itemToSearch === 'articles') {

                } else if (this.itemToSearch === 'my videos') {

                }
            }, 1000);
        } else {
            this.showLoadingSpinner = false;
            if (this.itemToSearch === 'videos') {
                this.resetPublicVideoSearchResult();
                if (this.referInfiniteScrollPublicVideo) {
                    this.referInfiniteScrollPublicVideo.target.disabled = false;
                }
            } else if (this.itemToSearch === 'articles') {

            } else if (this.itemToSearch === 'my videos') {

            }
        }
    }

    retrieveListOfPublicVideosByKeyword() {
        if (this.getListOfPublicVideosSubscription) {
            this.getListOfPublicVideosSubscription.unsubscribe();
        }
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
                this.resetPublicVideoSearchResult();
            }
            this.showLoadingSpinner = false;
        }, error => {
            this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve list of Videos, please try again later!', 'warning');
            this.showLoadingSpinner = false;
            this.resetPublicVideoSearchResult();
        });
    }

    resetPublicVideoSearchResult() {
        this.listOfPublicVideosResult = [];
        this.publicVideoMaximumPages = 0;
        this.publicVideoTotalResult = 0;

        this.listOfPublicArticlesResult = [];
        this.publicArticleMaximumPages = 0;
        this.publicArticleTotalResult = 0;

        this.listOfMyVideosResult = [];
        this.userVideoMaximumPages = 0;
        this.userVideoTotalResult = 0;
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

  changedSearchItemDropdown(event: any) {
      this.itemToSearch = event.detail.value;
      console.log(this.itemToSearch);
  }
}
