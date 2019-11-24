import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

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

  constructor() {
    console.log(this.constructorName + 'Initializing component');
    this.emitSelectedInventoryToCart$ = this.emitSelectedInventoryToCartSubject.asObservable();
    this.emitNumberOfSelectedInventoriesInCart$ = this.emitNumberOfSelectedInventoriesInCartSubject.asObservable();
  }

  emitSelectedInventory(selectedInventory) {
    this.selectedInventoryToCart.push(selectedInventory);
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
    this.selectedInventoryToCart = [];
    this.emitSelectedInventoryToCartSubject.next(this.selectedInventoryToCart);
    this.emitNumberOfSelectedInventoriesInCart();
  }
}
