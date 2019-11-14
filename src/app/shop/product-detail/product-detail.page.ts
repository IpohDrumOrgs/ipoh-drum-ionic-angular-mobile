import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Inventory, InventoryControllerServiceService} from '../../_dal/ipohdrum';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.page.html',
    styleUrls: ['./product-detail.page.scss'],
})

export class ProductDetailPage implements OnInit {

    inventoryUID: number;
    currentInventory: Inventory;
    isLoadingInventory = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private inventoryControllerService: InventoryControllerServiceService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.inventoryUID = +params.uid;
            this.inventoryControllerService.getInventoryByUid(
                this.inventoryUID.toString()
            ).subscribe(resp => {
                if (resp.code === 200) {
                    console.log('got the item: ' + this.inventoryUID);
                    console.log(resp);
                    this.currentInventory = resp.data;
                } else {
                    // TODO: Navigate to Shop page after showed alert prompt
                }
                this.isLoadingInventory = false;
            }, error => {
                console.log('cannot get item');
                this.isLoadingInventory = false;
                // TODO: Navigate to Shop page after showed alert prompt
            });
        });
    }

    backToShopPage() {
        this.router.navigate(['ipoh-drum/shop']).catch(reason => {
            console.log('Routing error, reason:', reason);
            // TODO: Navigate to home page after showed alert prompt
        });
    }
}
