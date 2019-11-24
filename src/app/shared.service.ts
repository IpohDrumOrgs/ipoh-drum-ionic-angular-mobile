import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {GlobalfunctionService} from './_dal/common/services/globalfunction.service';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  constructorName = '[' + this.constructor.name + ']';

  private selectedInventoryToCart: Array<any> = [];
  private emitSelectedInventoryToCartSubject = new Subject<any>();
  emitSelectedInventoryToCart$: Observable<any> = this.emitSelectedInventoryToCartSubject.asObservable();

  private numberOfSelectedInventoriesInCart = 0;
  private emitNumberOfSelectedInventoriesInCartSubject = new Subject<number>();
  emitNumberOfSelectedInventoriesInCart$: Observable<number> = this.emitNumberOfSelectedInventoriesInCartSubject.asObservable();

  constructor(
      private globalFunctionService: GlobalfunctionService
  ) {
    console.log(this.constructorName + 'Initializing component');
    this.emitSelectedInventoryToCart$ = this.emitSelectedInventoryToCartSubject.asObservable();
    this.emitNumberOfSelectedInventoriesInCart$ = this.emitNumberOfSelectedInventoriesInCartSubject.asObservable();
  }

  emitSelectedInventory(selectedInventory) {
    let alreadyContainInventory = false;
    if (this.selectedInventoryToCart.length > 0) {
      for (let inventory of this.selectedInventoryToCart) {
        if (inventory.uid === selectedInventory.uid) {
          alreadyContainInventory = true;
          if (inventory.qty > inventory.selectedQuantity) {
            inventory.selectedQuantity++;
            this.globalFunctionService.simpleToast(null, 'Item has been added to your cart!', 'success', 'bottom');
          } else {
            this.globalFunctionService.simpleToast(null, 'You have reached the maximum quantity for the item!', 'warning', 'bottom');
          }
          break;
        }
      }
      if (!alreadyContainInventory) {
        this.selectedInventoryToCart.push(selectedInventory);
        this.globalFunctionService.simpleToast(null, 'Item has been added to your cart!', 'success', 'bottom');
      }
    } else {
      this.selectedInventoryToCart.push(selectedInventory);
      this.globalFunctionService.simpleToast(null, 'Item has been added to your cart!', 'success', 'bottom');
    }
    console.log(this.selectedInventoryToCart);
    this.emitSelectedInventoryToCartSubject.next(this.selectedInventoryToCart);
    this.emitNumberOfSelectedInventoriesInCart();
  }

  emitNumberOfSelectedInventoriesInCart() {
    this.numberOfSelectedInventoriesInCart = this.selectedInventoryToCart.length;
    this.emitNumberOfSelectedInventoriesInCartSubject.next(this.numberOfSelectedInventoriesInCart);
  }

  returnSelectedInventoriesInCart() {
    return this.selectedInventoryToCart;
  }

  clearShoppingCart() {
    this.globalFunctionService.simpleToast(null,  'Cart has been cleared!', 'primary', 'top');
    this.selectedInventoryToCart = [];
    this.emitSelectedInventoryToCartSubject.next(this.selectedInventoryToCart);
    this.emitNumberOfSelectedInventoriesInCart();
  }

  removeSpecificInventoryFromCart(inventory: any) {
    this.selectedInventoryToCart = this.selectedInventoryToCart.filter(inventoryInCart => inventoryInCart.uid !== inventory.uid);
    this.emitSelectedInventoryToCartSubject.next(this.selectedInventoryToCart);
  }
}
