import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-bottom-menu',
  templateUrl: './bottom-menu.component.html',
  styleUrls: ['./bottom-menu.component.scss'],
})

export class BottomMenuComponent implements OnInit {

  constructor(
      private router: Router,
      private navController: NavController
  ) { }

  ngOnInit() {}

  navigateToPages(page: number) {
    switch (page) {
      case 0:
        // this.router.navigate(['/home']);
        this.navController.navigateRoot('/home');
        break;
      case 1:
        this.navController.navigateRoot('/shop');
        break;
      case 2:
        this.navController.navigateRoot('/shopping-cart');
        break;
      case 3:
        this.navController.navigateRoot('/user-profile');
        break;
    }
  }
}
