import {Component, NgZone, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Stripe} from '@ionic-native/stripe/ngx';
import {ModalController} from '@ionic/angular';
import {commonConfig} from '../../_dal/common/commonConfig';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PaymentControllerServiceService} from '../../_dal/ipohdrum';
import { environment } from '../../../environments/environment';
import {AuthenticationService} from '../../_dal/common/services/authentication.service';

@Component({
    selector: 'app-payment-info-modal',
    templateUrl: './payment-info-modal.page.html',
    styleUrls: ['./payment-info-modal.page.scss'],
})

export class PaymentInfoModalPage implements OnInit {

    // Strings
    constructorName = '[' + this.constructor.name + ']';
    stripePublishableKey = commonConfig.stripePublishableKey;
    stripePaymentLink = commonConfig.stripePaymentLink;
    numericOnlyRegex = commonConfig.numericOnlyRegex;
    cardNumberFirstPart: string;
    cardNumberSecondPart: string;
    cardNumberThirdPart: string;
    cardNumberFourthPart: string;

    // NgModels
    cardNumberModel: number;
    expiryMonthModel = 1;
    expiryYearModel: number;
    cvvModel: number;
    contactNumModel: string;

    // Numbers
    userId: string;
    currentYear = (new Date()).getFullYear();
    endYear: number;
    yearSubtraction = 20;
    cardNumberMinLength = commonConfig.cardNumberMinLength;
    cardCvvMinLength = commonConfig.cardSvvMinLength;

    // Arrays
    listOfMonths = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ];
    listOfYears: Array<number> = [];
    finalSaleInventory: Array<any>;

    // Objects
    cardInfo: any = {
        number: '',
        expMonth: '',
        expYear: '',
        cvc: ''
    };

    // FormGroups
    cardInfoFormGroup: FormGroup;
    contactNumFormGroup: FormGroup;

    // Subscriptions
    makePaymentSubscription: any;

    handler: any;

    constructor(
        private ngZone: NgZone,
        private modalController: ModalController,
        private httpClient: HttpClient,
        private stripe: Stripe,
        private authenticationService: AuthenticationService,
        private paymentControllerService: PaymentControllerServiceService
    ) {
        console.log(this.constructorName + 'Initializing component');
    }

    ngOnInit() {
        this.ngZone.run(() => {
            this.initializeUserInfo();
            this.contactNumFormGroup = new FormGroup({

            });
            this.cardInfoFormGroup = new FormGroup({
                cardNumber: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(this.cardNumberMinLength),
                    Validators.pattern(this.numericOnlyRegex)
                ]),
                cardExpiryMonth: new FormControl(),
                cardExpiryYear: new FormControl(),
                cardCvv: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(this.cardCvvMinLength),
                    Validators.pattern(this.numericOnlyRegex)
                ])
            });
            this.expiryYearModel = this.currentYear;
            this.endYear = this.currentYear + this.yearSubtraction;
            this.generateListOfYears();

            console.log('passed in inventory items:');
            console.log(this.finalSaleInventory);
        });
        this.handler = StripeCheckout.configure({
            key: environment.stripeKey,
            locale: 'auto',
            token: token => {
                console.log('got token');
                console.log(token.id);
                console.log(token.email);
                console.log(this.contactNumModel);
                console.log(JSON.stringify(this.finalSaleInventory));
                console.log(this.userId);
                if (this.makePaymentSubscription) {
                    this.makePaymentSubscription.unsubscribe();
                }
                this.makePaymentSubscription = this.paymentControllerService.createInventoryPayment(
                    token.id.toString(),
                    token.email.toString(),
                    this.contactNumModel,
                    JSON.stringify(this.finalSaleInventory),
                    this.userId ? this.userId : null
                ).subscribe(resp => {
                   console.log('make payment');
                   console.log(resp);
                }, error => {
                    console.log('error make payment');
                    console.log(error);
                });
            }
        });
    }

    initializeUserInfo() {
        this.authenticationService.authenticate().then(resp => {
            if (resp.status) {
                if (resp.status === 200) {
                    this.userId = resp.data.id;
                }
            } else {
                if (resp.name === 'Error') {
                    this.userId = null;
                    // this.globalFunctionService.simpleToast('ERROR!', 'You are not authenticated, please login first!', 'danger');
                    // this.router.navigate(['/login']);
                }
            }
        }, error => {
            this.userId = null;
            // this.globalFunctionService.simpleToast('ERROR!', 'You are not authenticated, please login first!', 'danger');
            // this.router.navigate(['/login']);
        });
    }

    generateListOfYears() {
        for (let i = this.endYear; i >= this.currentYear - this.yearSubtraction; i--) {
            this.listOfYears.push(i);
        }
    }

    cardNumberChange() {
        // First Part
        if (this.cardNumberModel) {
            if (this.cardNumberModel.toString().length > 3) {
                this.cardNumberFirstPart = this.cardNumberModel.toString().substr(0, 4);
            } else {
                this.cardNumberFirstPart = '';
                for (let i = 0; i < 4; i++) {
                    if (this.cardNumberModel.toString().substr(i, 1)) {
                        this.cardNumberFirstPart += this.cardNumberModel.toString().charAt(i);
                    } else {
                        this.cardNumberFirstPart += 'X';
                    }
                }
            }
            // Second Part
            if (this.cardNumberModel.toString().length > 7) {
                this.cardNumberSecondPart = this.cardNumberModel.toString().substr(4, 4);
            } else {
                this.cardNumberSecondPart = '';
                for (let i = 4; i < 8; i++) {
                    if (this.cardNumberModel.toString().substr(i, 1)) {
                        this.cardNumberSecondPart += this.cardNumberModel.toString().charAt(i);
                    } else {
                        this.cardNumberSecondPart += 'X';
                    }
                }
            }
            // Third Part
            if (this.cardNumberModel.toString().length > 11) {
                this.cardNumberThirdPart = this.cardNumberModel.toString().substr(8, 4);
            } else {
                this.cardNumberThirdPart = '';
                for (let i = 8; i < 12; i++) {
                    if (this.cardNumberModel.toString().substr(i, 1)) {
                        this.cardNumberThirdPart += this.cardNumberModel.toString().charAt(i);
                    } else {
                        this.cardNumberThirdPart += 'X';
                    }
                }
            }
            // Fourth Part
            if (this.cardNumberModel.toString().length > 15) {
                this.cardNumberFourthPart = this.cardNumberModel.toString().substr(12, 4);
            } else {
                this.cardNumberFourthPart = '';
                for (let i = 12; i < 16; i++) {
                    if (this.cardNumberModel.toString().substr(i, 1)) {
                        this.cardNumberFourthPart += this.cardNumberModel.toString().charAt(i);
                    } else {
                        this.cardNumberFourthPart += 'X';
                    }
                }
            }
        }
    }

    closePaymentInfoModal() {
        this.modalController.dismiss();
    }

    pay() {
        this.handler.open({
            name: 'IpohDrum',
            description: 'Payment Information'
        });
    }
}
