import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})

export class UserProfileComponent implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {}

  openMenu() {
    this.menuController.enable(true, 'first');
    this.menuController.open('first');
  }

  myVideos() {
    console.log('my videos');
    // navigate to myvideos page
    this.menuController.close('first');
  }

  myStore() {
    console.log('my store');
    // navigate to mystore page
    this.menuController.close('first');
  }

  myOrders() {
    console.log('my orders');
    // navigate to myorders page
    this.menuController.close('first');
  }

  myStatistics() {
    console.log('my statistics');
    this.menuController.close('first');
  }
}
