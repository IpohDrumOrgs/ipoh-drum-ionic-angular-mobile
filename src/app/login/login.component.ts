import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../_dal/common/services/authentication.service';
import { User } from '../_dal/ipohdrum';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(private authenticationService: AuthenticationService) {}

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
    console.log('login user');
    console.log(this.userToLogin);
    this.userToLogin.email = this.userEmail;
    this.userToLogin.password = this.userPassword;
    this.loginUserSubscription = this.authenticationService.login(this.userToLogin).then(resp => {
      console.log(resp);
      // Redirect users to home page
    }, error => {
      // Show error toast
    });
  }
}
