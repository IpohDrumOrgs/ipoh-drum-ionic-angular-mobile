import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { AuthenticationService } from '../_dal/common/services/authentication.service';
import { User } from '../_dal/ipohdrum';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  userNameRegex = '^[a-zA-Z ]*$';

  minLengthOfUsername = 2;
  maxLengthOfUsername = 20;
  minLengthOfPassword = 8;
  maxLengthOfPassword = 20;

  userToLogin: User = {} as User;

  showLoginCard = true;
  showRegisterCard = false;

  userLoginFormGroup: FormGroup;
  userRegisterFormGroup: FormGroup;

  loginUserSubscription: any;

  constructor(
      private authenticationService: AuthenticationService,
      private ngZone: NgZone) {}

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
      if (this.loginUserSubscription) {
        this.loginUserSubscription.unsubscribe();
      }
    });
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
