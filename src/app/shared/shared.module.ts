import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {BottomMenuComponent} from './bottom-menu/bottom-menu.component';
import {RouterModule} from '@angular/router';
import { MyCurrencyPipe } from './my-currency.pipe';

@NgModule({
    declarations: [
        BottomMenuComponent,
        MyCurrencyPipe
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule
    ],
    exports: [
        BottomMenuComponent,
        MyCurrencyPipe
    ]
})

export class SharedModule {
}
