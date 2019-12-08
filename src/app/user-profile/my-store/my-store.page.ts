import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.page.html',
  styleUrls: ['./my-store.page.scss'],
})

export class MyStorePage implements OnInit {

  constructorName = '[' + this.constructor.name + ']';

  noInventoriesUploaded = true;

  listOfCountries: any[] = [
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      area: 17075200,
      population: 146989754
    },
    {
      name: 'Canada',
      flag: 'c/cf/Flag_of_Canada.svg',
      area: 9976140,
      population: 36624199
    },
    {
      name: 'United States',
      flag: 'a/a4/Flag_of_the_United_States.svg',
      area: 9629091,
      population: 324459463
    },
    {
      name: 'China',
      flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
      area: 9596960,
      population: 1409517397
    }
  ];

  constructor(
      private router: Router
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
  }

  navigateToAddInventory() {
    this.router.navigate(['ipoh-drum/user-profile/my-store/add-inventory']);
  }
}
