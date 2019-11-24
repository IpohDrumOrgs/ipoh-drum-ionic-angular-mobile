import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';
import {AlertController} from '@ionic/angular';

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
      public alertController: AlertController
  ) {
    console.log(this.constructorName + 'Initializing component');
    this.listOfInventoriesInCart = this.sharedService.returnSelectedInventoriesInCart();
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.inventoriesInCartSubscription = this.sharedService.emitSelectedInventoryToCart$.subscribe(data => {
        this.listOfInventoriesInCart = data;
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
      this.presentAlertConfirm(inventoryInCart);
    }
  }

  async presentAlertConfirm(inventory: any) {
    const alert = await this.alertController.create({
      header: 'Remove From Cart',
      message: 'Are you sure you want to remove the item from your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          handler: () => {
            this.sharedService.removeSpecificInventoryFromCart(inventory);
          }
        }
      ]
    });
    await alert.present();
  }
}
