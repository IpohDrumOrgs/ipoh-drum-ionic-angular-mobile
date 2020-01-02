import {Component, NgZone, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Stripe} from '@ionic-native/stripe/ngx';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-payment-info-modal',
  templateUrl: './payment-info-modal.page.html',
  styleUrls: ['./payment-info-modal.page.scss'],
})

export class PaymentInfoModalPage implements OnInit {

  // Strings
  constructorName = '[' + this.constructor.name + ']';

  cardinfo: any = {
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  };

  constructor(
      private ngZone: NgZone,
      private modalController: ModalController,
      private httpClient: HttpClient,
      private stripe: Stripe
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {

    });
  }

  closePaymentInfoModal() {
    this.modalController.dismiss();
  }

  pay() {
    console.log('here');
    console.log(this.cardinfo);
    let data = {};
    this.stripe.setPublishableKey('pk_test_mU2xWRsOVeUQYUXLWVyHGM6z00PJ5ZvmOe');
    this.stripe.createCardToken(this.cardinfo).then((token) => {
      data = {
        token,
        amount: 50,
        provider: 'payment',
      };
      console.log(data);
      this.httpClient.post('http://localhost:8080/api/payment', data,
          {
            headers: {'Content-Type': 'application/json'}
          }).subscribe(res => {
        console.log(res);
      });
    });
  }
}
