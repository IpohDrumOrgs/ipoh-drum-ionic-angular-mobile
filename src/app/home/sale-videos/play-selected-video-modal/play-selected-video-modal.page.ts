import {Component, NgZone, OnInit} from '@angular/core';
import {Video, VideoControllerServiceService} from '../../../_dal/ipohdrum';
import {GlobalfunctionService} from '../../../_dal/common/services/globalfunction.service';
import {ModalController} from '@ionic/angular';
import {LoadingService} from '../../../_dal/common/services/loading.service';
import { EmbedVideoService } from 'ngx-embed-video';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-play-selected-video-modal',
    templateUrl: './play-selected-video-modal.page.html',
    styleUrls: ['./play-selected-video-modal.page.scss'],
})

export class PlaySelectedVideoModalPage implements OnInit {

    // Strings
    constructorName = '[' + this.constructor.name + ']';
    publicVideoUid: string;
    videoUrl: string;

    // Boolean
    isLoadingSelectedVideo = true;

    // Objects
    selectedPublicVideo: Video;

    // Subscriptions
    getVideoByIdSubscription: any;

    iFrameHtml: any;

    constructor(
        private domSanitizer: DomSanitizer,
        private embedService: EmbedVideoService,
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
            console.log(resp.data);
            console.log(resp.data.videopath);
            console.log(this.videoUrl);
            if (resp.code === 200) {
                this.selectedPublicVideo = resp.data;
                this.videoUrl = this.selectedPublicVideo.videopath;
                this.iFrameHtml = this.embedService.embed(this.videoUrl);
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

    async closePlaySelectedVideoModal() {
        await this.modalController.dismiss();
    }
}
