import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';
import {GlobalfunctionService} from '../_dal/common/services/globalfunction.service';
import {commonConfig} from '../_dal/common/commonConfig';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})

export class ShoppingCartPage implements OnInit {

  // Strings
  constructorName = '[' + this.constructor.name + ']';

  // Numbers
  nullSelectedInventoryPatternId = commonConfig.nullSelectedInventoryPatternId;

  // Arrays
  listOfInventoriesInCart: Array<any> = [];

  // Subscriptions
  inventoriesInCartSubscription: any;

  constructor(
      private ngZone: NgZone,
      private sharedService: SharedService,
      private globalFunctionService: GlobalfunctionService
  ) {
    console.log(this.constructorName + 'Initializing component');
    this.listOfInventoriesInCart = this.sharedService.returnSelectedInventoriesInCart();

    console.log('cart');
    console.log(this.listOfInventoriesInCart);
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.inventoriesInCartSubscription = this.sharedService.emitSelectedInventoryToCart$.subscribe(data => {
        this.listOfInventoriesInCart = data;
        console.log('new cart');
        console.log(this.listOfInventoriesInCart);
      });
    });
  }

  clearShoppingCart() {
    this.globalFunctionService.presentAlertConfirm(
        'Clear Cart',
        'Are you sure you want to clear your shopping cart?',
        'Cancel',
        'Yes',
        undefined,
        () => this.actuallyClearShoppingCart());
  }

  actuallyClearShoppingCart() {
    this.sharedService.clearShoppingCart();
  }

  increaseInventoryQuantity(inventoryInCart: any) {
    if (inventoryInCart.qty > inventoryInCart.selectedQuantity) {
      inventoryInCart.selectedQuantity++;
    }
  }

  reduceInventoryQuantity(inventoryInCart: any, indexInCart: number) {
    if (inventoryInCart.selectedQuantity > 1) {
      inventoryInCart.selectedQuantity--;
    } else {
      this.globalFunctionService.presentAlertConfirm(
          'Remove From Cart',
          'Are you sure you want to remove the item from your cart?',
          'Cancel',
          'Yes',
          undefined,
          () => this.removeInventoryFromCart(inventoryInCart, indexInCart));
    }
  }

  removeInventoryFromCart(inventory: any, indexInCart: number) {
    this.sharedService.removeSpecificInventoryFromCart(inventory, indexInCart);
  }
}
