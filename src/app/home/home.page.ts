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

  constructor() {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {

  }

  selectedTab(tab: string) {
    this.currentTab = tab;
  }

  ionViewDidLeave() {
    console.log(this.constructorName + 'left view');
  }

  ionViewDidEnter() {
    console.log(this.constructorName + 'entered view');
  }
}
