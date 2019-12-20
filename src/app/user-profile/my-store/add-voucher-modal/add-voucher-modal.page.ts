import {Component, NgZone, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-add-voucher-modal',
  templateUrl: './add-voucher-modal.page.html',
  styleUrls: ['./add-voucher-modal.page.scss'],
})
export class AddVoucherModalPage implements OnInit {

  constructor(
      private modalController: ModalController,
      private ngZone: NgZone
  ) { }

  ngOnInit() {
  }

  async closeAddVoucherModal(returnFromCreatingVoucher: boolean) {
    await this.modalController.dismiss(returnFromCreatingVoucher);
  }
}
