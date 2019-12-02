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
        if (inventory.uid === selectedInventory.uid
            && inventory.selectedInventoryFamily.id === selectedInventory.selectedInventoryFamily.id
            && inventory.selectedInventoryPattern.id === selectedInventory.selectedInventoryPattern.id
        ) {
          alreadyContainInventory = true;
          if (inventory.qty >= (inventory.selectedQuantity + selectedInventory.quantitiesToAdd)) {
            inventory.selectedQuantity += selectedInventory.quantitiesToAdd;
            this.globalFunctionService.simpleToast(null, 'Item has been added to your cart!', 'success', 'bottom');
          } else {
            this.globalFunctionService.simpleToast(null, 'Not enough stock, please try again with a different quantity number!', 'warning', 'bottom');
          }
          break;
        }
      }
      if (!alreadyContainInventory) {
        selectedInventory.selectedQuantity += selectedInventory.quantitiesToAdd;
        this.selectedInventoryToCart.push(selectedInventory);
        this.globalFunctionService.simpleToast(null, 'Item has been added to your cart!', 'success', 'bottom');
      }
    } else {
      selectedInventory.selectedQuantity += selectedInventory.quantitiesToAdd;
      this.selectedInventoryToCart.push(selectedInventory);
      this.globalFunctionService.simpleToast(null, 'Item has been added to your cart!', 'success', 'bottom');
    }
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

  removeSpecificInventoryFromCart(inventory: any, indexInCart: number) {
    // Filter the array by 'uid', can be used in the future
    // this.selectedInventoryToCart = this.selectedInventoryToCart.filter(inventoryInCart => inventoryInCart.uid !== inventory.uid);
    this.selectedInventoryToCart.splice(indexInCart, 1);
    this.emitSelectedInventoryToCartSubject.next(this.selectedInventoryToCart);
    this.emitNumberOfSelectedInventoriesInCart();
  }
}
