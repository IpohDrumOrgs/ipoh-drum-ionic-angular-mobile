import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-ipoh-drum',
  templateUrl: './ipoh-drum.page.html',
  styleUrls: ['./ipoh-drum.page.scss'],
})
export class IpohDrumPage implements OnInit {

  numberOfInventoriesInCart: number;

  numberOfInventoriesInCartSubscription: any;

  constructor(
      private sharedService: SharedService
  ) {

  }

  ngOnInit() {
    this.numberOfInventoriesInCartSubscription = this.sharedService.emitNumberOfSelectedInventoriesInCart$.subscribe(data => {
      this.numberOfInventoriesInCart = data;
    });
  }
}
