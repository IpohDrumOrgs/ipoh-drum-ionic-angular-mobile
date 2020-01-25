import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  // Strings
  constructorName = '[' + this.constructor.name + ']';
  currentTab = 'videos';

  // Booleans
  isShowingVideosTab = true;
  isShowingArticlesTab = false;
  isShowingMyVideosCollectionTab = false;

  constructor() {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
  }

  selectedTab(tab: string) {
    this.currentTab = tab;
    if (this.currentTab === 'videos') {
      this.isShowingVideosTab = true;
      this.isShowingArticlesTab = false;
      this.isShowingMyVideosCollectionTab = false;
    } else if (this.currentTab === 'articles') {
      this.isShowingVideosTab = false;
      this.isShowingArticlesTab = true;
      this.isShowingMyVideosCollectionTab = false;
    } else if (this.currentTab === 'my-videos-collection') {
      this.isShowingVideosTab = false;
      this.isShowingArticlesTab = false;
      this.isShowingMyVideosCollectionTab = true;
    }
  }

/*  ionViewDidLeave() {
    console.log(this.constructorName + 'left view');
  }

  ionViewDidEnter() {
    console.log(this.constructorName + 'entered view');
  }*/
}
