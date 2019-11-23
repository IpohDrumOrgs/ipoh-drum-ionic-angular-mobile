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

  constructor() {
    console.log(this.constructorName + 'Initializing component');
    this.emitSelectedInventoryToCart$ = this.emitSelectedInventoryToCartSubject.asObservable();
  }

  emitSelectedInventory(selectedInventory) {
    this.selectedInventoryToCart.push(selectedInventory);
    this.emitSelectedInventoryToCartSubject.next(this.selectedInventoryToCart);
  }
}
