import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Comment, Video, VideoControllerServiceService} from '../../../_dal/ipohdrum';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';
import {ModalController} from '@ionic/angular';
import {LoadingService} from '../../../_dal/common/services/loading.service';
import {PaymentInfoModalPage} from '../../../shared/payment-info-modal/payment-info-modal.page';
import {commonConfig} from '../../../_dal/common/commonConfig';

@Component({
    selector: 'app-play-selected-video-modal',
    templateUrl: './play-selected-video-modal.page.html',
    styleUrls: ['./play-selected-video-modal.page.scss'],
})

export class PlaySelectedVideoModalPage implements OnInit, OnDestroy {

    // Strings
    constructorName = '[' + this.constructor.name + ']';
    publicVideoUid: string;
    videoUrl: string;

    // Numbers
    currentPageNumber = 1;
    currentPageSize = commonConfig.currentPageSize;
    maximumPages: number;
    totalResult: number;

    // Boolean
    isLoadingSelectedVideo = true;

    // Arrays
    listOfCommentsForSelectedVideo: Array<Comment> = [];

    // Objects
    selectedPublicVideo: Video;
    referInfiniteScroll: any;

    // Subscriptions
    getVideoByIdSubscription: any;
    getListOfCommentsBySelectedVideoSubscription: any;
    appendListOfCommentsBySelectedVideoSubscription: any;

    constructor(
        private ngZone: NgZone,
        private loadingService: LoadingService,
        private videoControllerService: VideoControllerServiceService,
        private globalFunctionService: GlobalfunctionService,
        private modalController: ModalController
    ) {
        console.log(this.constructorName + 'Initializing component');
    }

    ngOnInit() {
        this.ngZone.run(() => {
            this.retrieveSelectedPublicVideoByUid();
            this.retrieveListOfCommentsBySelectedVideo();
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
           if (this.getVideoByIdSubscription) {
               this.getVideoByIdSubscription.unsubscribe();
           }
           if (this.getListOfCommentsBySelectedVideoSubscription) {
               this.getListOfCommentsBySelectedVideoSubscription.unsubscribe();
           }
           if (this.appendListOfCommentsBySelectedVideoSubscription) {
               this.appendListOfCommentsBySelectedVideoSubscription.unsubscribe();
           }
        });
    }

    retrieveSelectedPublicVideoByUid() {
        this.isLoadingSelectedVideo = true;
        if (this.getVideoByIdSubscription) {
            this.getVideoByIdSubscription.unsubscribe();
        }
        this.getVideoByIdSubscription = this.videoControllerService.getPublicVideoByUid(
            this.publicVideoUid
        ).subscribe(resp => {
            console.log('get video by id');
            console.log(resp);
            if (resp.code === 200) {
                this.selectedPublicVideo = resp.data;
                this.videoUrl = this.selectedPublicVideo.videopath;
            } else {
                console.log('API Error while retrieving the selected public video by uid.');
                this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve the selected Video, please try again later!', 'danger');
                this.closePlaySelectedVideoModal();
            }
            this.isLoadingSelectedVideo = false;
        }, error => {
            console.log('API Error while retrieving the selected public video by uid.');
            this.globalFunctionService.simpleToast('ERROR', 'Unable to retrieve the selected Video, please try again later!', 'danger');
            this.closePlaySelectedVideoModal();
            this.isLoadingSelectedVideo = false;
        });
    }

    retrieveListOfCommentsBySelectedVideo() {
        if (this.getListOfCommentsBySelectedVideoSubscription) {
            this.getListOfCommentsBySelectedVideoSubscription.unsubscribe();
        }
        this.getListOfCommentsBySelectedVideoSubscription = this.videoControllerService.getPublicVideoComments(
            this.publicVideoUid,
            this.currentPageNumber,
            this.currentPageSize
        ).subscribe(resp => {
            if (resp.code === 200) {
                this.listOfCommentsForSelectedVideo = resp.data;
                this.maximumPages = resp.maximumPages;
                this.totalResult = resp.totalResult;
            } else {
                this.listOfCommentsForSelectedVideo = [];
                this.maximumPages = 0;
                this.totalResult = 0;
                this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Comments, please revisit the page later.', 'warning');
            }
        }, error => {
            console.log('API Error while retrieving list of Comments by selected Video');
            console.log(error);
            this.globalFunctionService.simpleToast('WARNING', 'Unable to retrieve Comments, please revisit the page later.', 'warning');
        });
    }

    closePlaySelectedVideoModal() {
        this.modalController.dismiss();
    }

    async openPaymentInfoModal() {
        const modal = await this.modalController.create({
            component: PaymentInfoModalPage
        });
        return await modal.present();
    }

    loadMoreComments(event) {
        this.referInfiniteScroll = event;
        if (this.selectedPublicVideo.commentcount > 0) {
            setTimeout(() => {
                if (this.maximumPages > this.currentPageNumber) {
                    this.currentPageNumber++;
                    this.appendListOfCommentsBySelectedVideoSubscription = this.videoControllerService.getPublicVideoComments(
                        this.publicVideoUid,
                        this.currentPageNumber,
                        this.currentPageSize
                    ).subscribe(resp => {
                        if (resp.code === 200) {
                            for (const tempComment of resp.data) {
                                this.listOfCommentsForSelectedVideo.push(tempComment);
                            }
                        }
                        this.referInfiniteScroll.target.complete();
                    }, error => {
                        console.log('API Error while retrieving list of comments');
                        this.referInfiniteScroll.target.complete();
                    });
                }
                if (this.totalResult === this.listOfCommentsForSelectedVideo.length) {
                    this.referInfiniteScroll.target.disabled = true;
                }
            }, 500);
        }
    }
}
