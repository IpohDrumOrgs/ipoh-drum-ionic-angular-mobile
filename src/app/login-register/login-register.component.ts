import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import {AuthenticationService} from '../_dal/common/services/authentication.service';
import {User, UserControllerServiceService} from '../_dal/ipohdrum';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {commonConfig} from '../_dal/common/commonConfig';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login-register',
    templateUrl: './login-register.component.html',
    styleUrls: ['./login-register.component.scss'],
})

export class LoginRegisterComponent implements OnInit, OnDestroy {

    constructorName = '[' + this.constructor.name + ']';
    userEmailLogin: string;
    userPasswordLogin: string;

    userNameRegister: string;
    emailRegister: string;
    passwordRegister: string;
    confirmPasswordRegister: string;
    userNameRegex = commonConfig.userNameRegex;

    minLengthOfUsername = commonConfig.minLengthOfUsername;
    maxLengthOfUsername = commonConfig.maxLengthOfUsername;
    minLengthOfPassword = 8;
    maxLengthOfPassword = 20;

    userToLogin: User = {} as User;

    showLoginCard = true;
    showRegisterCard = false;

    userLoginFormGroup: FormGroup;
    userRegisterFormGroup: FormGroup;

    constructor(
        private authenticationService: AuthenticationService,
        private ngZone: NgZone,
        private navController: NavController,
        private router: Router
    ) {

    }

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
                    Validators.pattern(this.passwordRegister)
                ])
            });
        });
    }

    ngOnDestroy() {
        this.ngZone.run(() => {
            console.log('destroy');
        });
    }

    ionViewLoaded() {
        console.log('ionviewloaded');
    }

    ionViewWillEnter() {
        console.log('ionviewwillenter');
    }

    ionViewDidEnter() {
        console.log('ionviewdidenter');
    }

    ionViewWillLeave() {
        console.log('ionviewwillleave');
    }

    ionViewDidLeave() {
        console.log('ionviewdidleave');
    }

    loginUser() {
        this.ngZone.run(() => {
            this.userToLogin.email = this.userEmailLogin;
            this.userToLogin.password = this.userPasswordLogin;
            this.authenticationService.login(this.userToLogin);
            this.router.navigate(['/home']);
        });
    }

    registerUser() {
        this.ngZone.run(() => {
            console.log('register user');
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
    }
}
