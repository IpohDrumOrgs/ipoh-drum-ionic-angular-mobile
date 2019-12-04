import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.page.html',
  styleUrls: ['./add-inventory.page.scss'],
})

export class AddInventoryPage implements OnInit {

  constructorName = '[' + this.constructor.name + ']';

  temporaryImageUrls = new Array<string>();

  constructor(
      private router: Router
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
  }

  backToMyStorePage() {
    this.router.navigate(['ipoh-drum/user-profile/my-store']);
  }


  detectFiles(event) {
    this.temporaryImageUrls = [];
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.temporaryImageUrls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }
}
