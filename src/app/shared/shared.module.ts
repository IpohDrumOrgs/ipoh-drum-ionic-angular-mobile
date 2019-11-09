import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {BottomMenuComponent} from './bottom-menu/bottom-menu.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        BottomMenuComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule
    ],
    exports: [
        BottomMenuComponent
    ]
})

export class SharedModule {
}
