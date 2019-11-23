import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  constructorName = '[' + this.constructor.name + ']';

  constructor() { }
}
