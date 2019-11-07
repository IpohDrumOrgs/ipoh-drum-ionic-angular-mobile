import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { AuthenticationService } from '../_dal/common/services/authentication.service';
import { User } from '../_dal/ipohdrum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit, OnDestroy {

  constructorName = '[' + this.constructor.name + ']';
  userEmail: string;
  userPassword: string;

  // TODO: A way to declare empty objects
  userToLogin: User = {} as User;

  userLoginFormGroup: FormGroup;

  loginUserSubscription: any;

  someFlag: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private ngZone: NgZone,
    private router: Router) {}

  ngOnInit() {
     this.userLoginFormGroup = new FormGroup({
      userEmail: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      userPassword: new FormControl(null, [
        Validators.required
      ])
    });
  }

  ngOnDestroy() {
    if (this.loginUserSubscription) {
      this.loginUserSubscription.unsubscribe();
    }
  }

  loginUser() {
    this.ngZone.run(() => {
      this.userToLogin.email = this.userEmail;
      this.userToLogin.password = this.userPassword;
      this.authenticationService.login(this.userToLogin);
    });
  }
}
