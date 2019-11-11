import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.page.html',
    styleUrls: ['./shop.page.scss'],
})

export class ShopPage implements OnInit {

    keywordToSearchItems = '';

    imageObject: Array<object> = [
        {
            image: 'assets/images/ekko.jpg',
            thumbImage: 'assets/images/ekko.jpg',
            alt: 'ekko alt of image',
            title: 'Ekko'
        },
        {
            image: 'assets/images/deku.jpeg',
            thumbImage: 'assets/images/deku.jpeg',
            alt: 'deku alt of image',
            title: 'Deku'
        },
        {
            image: 'assets/images/maxresdefault.jpg',
            thumbImage: 'assets/images/maxresdefault.jpg',
            alt: 'puppy alt of image',
            title: 'Puppy'
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }

    searchItems() {
        console.log('search item:' + this.keywordToSearchItems);
    }
}
