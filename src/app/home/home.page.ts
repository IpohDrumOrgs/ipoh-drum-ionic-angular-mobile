import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  currentTab = 'videos';

  searchInputPlaceholder = '';

  constructor() {}

  selectedTab(tab: string) {
    this.currentTab = tab;
  }
}
