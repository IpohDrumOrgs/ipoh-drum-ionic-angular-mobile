import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})

export class ShoppingCartPage implements OnInit {

  constructorName = '[' + this.constructor.name + ']';

  listOfInventoriesInCart: Array<any> = [];

  inventoriesInCartSubscription: any;

  constructor(
      private ngZone: NgZone,
      private sharedService: SharedService
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    console.log(this.constructorName + 'NgOnInit');
    this.ngZone.run(() => {
      console.log(this.constructorName + 'NgZone');
      this.inventoriesInCartSubscription = this.sharedService.emitSelectedInventoryToCart$.subscribe(data => {
        this.listOfInventoriesInCart = data;
        console.log('inventories in cart showing in cart');
        console.log(this.listOfInventoriesInCart);
      });
    });
  }
}
