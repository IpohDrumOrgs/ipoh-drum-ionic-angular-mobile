import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})

export class UserProfileComponent implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {
    this.menuController.enable(true, 'userProfileSideBar');
  }

  closeSideMenu() {
    this.menuController.close('userProfileSideBar');
  }
}
