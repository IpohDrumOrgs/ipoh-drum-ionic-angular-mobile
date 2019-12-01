import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';
import {GlobalfunctionService} from '../_dal/common/services/globalfunction.service';

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
      private sharedService: SharedService,
      private globalFunctionService: GlobalfunctionService
  ) {
    console.log(this.constructorName + 'Initializing component');
    this.listOfInventoriesInCart = this.sharedService.returnSelectedInventoriesInCart();
    console.log(this.listOfInventoriesInCart);
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.inventoriesInCartSubscription = this.sharedService.emitSelectedInventoryToCart$.subscribe(data => {
        this.listOfInventoriesInCart = data;
        console.log('in shopping cart page subscribe to shared service');
        console.log(this.listOfInventoriesInCart);
      });
    });
  }

  clearShoppingCart() {
    this.sharedService.clearShoppingCart();
  }

  increaseInventoryQuantity(inventoryInCart: any) {
    if (inventoryInCart.qty > inventoryInCart.selectedQuantity) {
      inventoryInCart.selectedQuantity++;
    }
  }

  reduceInventoryQuantity(inventoryInCart: any) {
    if (inventoryInCart.selectedQuantity > 1) {
      inventoryInCart.selectedQuantity--;
    } else {
      this.globalFunctionService.presentAlertConfirm(
          'Remove From Cart',
          'Are you sure you want to remove the item from your cart?',
          'Cancel',
          'Yes',
          undefined,
          () => this.removeInventoryFromCart(inventoryInCart));
    }
  }

  removeInventoryFromCart(inventory: any) {
    this.sharedService.removeSpecificInventoryFromCart(inventory);
  }
}
