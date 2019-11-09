import {Component, OnInit, NgZone} from '@angular/core';
import {AuthenticationService} from '../_dal/common/services/authentication.service';
import {User, UserControllerServiceService} from '../_dal/ipohdrum';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {commonConfig} from '../_dal/common/commonConfig';
import {NavController} from '@ionic/angular';
import {GlobalfunctionService} from '../_dal/common/services/globalfunction.service';

@Component({
    selector: 'app-login-register',
    templateUrl: './login-register.component.html',
    styleUrls: ['./login-register.component.scss'],
})

export class LoginRegisterComponent implements OnInit {

    constructorName = '[' + this.constructor.name + ']';
    userEmailLogin: string;
    userPasswordLogin: string;

    userNameRegister: string;
    emailRegister: string;
    passwordRegister: string;
    confirmPasswordRegister: string;
    userNameRegex = commonConfig.userNameRegex;
    apiErrorMessage = commonConfig.apiErrorMessage;

    minLengthOfUsername = commonConfig.minLengthOfUsername;
    maxLengthOfUsername = commonConfig.maxLengthOfUsername;
    minLengthOfPassword = 8;
    maxLengthOfPassword = 20;

    userToLogin: User = {} as User;

    showLoginCard = true;
    showRegisterCard = false;

    userLoginFormGroup: FormGroup;
    userRegisterFormGroup: FormGroup;

    userRegisterSubscription: any;

    constructor(
        private authenticationService: AuthenticationService,
        private ngZone: NgZone,
        private globalFunctionService: GlobalfunctionService,
        private userControllerService: UserControllerServiceService,
        private navController: NavController
    ) {}

    ngOnInit() {
        this.ngZone.run(() => {
            this.userLoginFormGroup = new FormGroup({
                userEmail: new FormControl(null, [
                    Validators.required,
                    Validators.email
                ]),
                userPassword: new FormControl(null, [
                    Validators.required
                ])
            });
            this.userRegisterFormGroup = new FormGroup({
                userNameFc: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(this.minLengthOfUsername),
                    Validators.maxLength(this.maxLengthOfUsername),
                    Validators.pattern(this.userNameRegex)
                ]),
                userEmailFc: new FormControl(null, [
                    Validators.required,
                    Validators.email
                ]),
                userPasswordFc: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(this.minLengthOfPassword),
                    Validators.maxLength(this.maxLengthOfPassword)
                ]),
                userConfirmPasswordFc: new FormControl(null, [
                    Validators.required,
                    Validators.minLength(this.minLengthOfPassword),
                    Validators.maxLength(this.maxLengthOfPassword),
                    Validators.pattern(this.passwordRegister)
                ])
            });
        });
    }

    ionViewWillEnter() {
        this.userLoginFormGroup.reset();
        this.userRegisterFormGroup.reset();
        if (this.authenticationService.isUserLoggedIn()) {
            this.globalFunctionService.simpleToast('WARNING!', 'You are already logged in!', 'warning');
            // this.navController.navigateRoot('/ipoh-drum/home');
        }
    }

    ionViewWillLeave() {
        if (this.userRegisterSubscription) {
            this.userRegisterSubscription.unsubscribe();
        }
    }

    loginUser() {
        this.ngZone.run(() => {
            this.userToLogin.email = this.userEmailLogin;
            this.userToLogin.password = this.userPasswordLogin;
            this.authenticationService.login(this.userToLogin);
        });
    }

    registerUser() {
        this.ngZone.run(() => {
            console.log('register user');
            this.userRegisterSubscription = this.userControllerService.createUserWithoutAuthorization(
                this.userNameRegister,
                this.emailRegister,
                this.passwordRegister,
                this.confirmPasswordRegister,
                'MALAYSIA'
            ).subscribe(resp => {
                console.log('resgister ok');
                console.log(resp);
            }, error => {
                this.globalFunctionService.simpleToast('ERROR!', this.apiErrorMessage, 'danger');
            });
        });
    }

    changeToUserRegistrationCard() {
        this.showHideLoginAndRegisterCards(false, true);
    }

    changeToUserLoginCard() {
        this.showHideLoginAndRegisterCards(true, false);
    }

    showHideLoginAndRegisterCards(loginFlag: boolean, registerFlag: boolean) {
        this.showLoginCard = loginFlag;
        this.showRegisterCard = registerFlag;
        this.userLoginFormGroup.reset();
        this.userRegisterFormGroup.reset();
    }
}
