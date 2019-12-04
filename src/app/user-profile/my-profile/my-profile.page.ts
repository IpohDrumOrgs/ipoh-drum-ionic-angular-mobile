import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {commonConfig} from '../../_dal/common/commonConfig';
import {User, UserControllerServiceService} from '../../_dal/ipohdrum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../_dal/common/services/authentication.service';
import {Router} from '@angular/router';
import {LoadingService} from '../../_dal/common/services/loading.service';
import {GlobalfunctionService} from '../../_dal/common/services/globalfunction.service';
import {AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})

export class MyProfilePage implements OnInit, OnDestroy {

  constructorName = '[' + this.constructor.name + ']';
  userNameRegex = commonConfig.userNameRegex;
  icNoRegex = commonConfig.icNoRegex;
  phoneNumberRegex = commonConfig.phoneNumberRegex;
  apiErrorMessage = commonConfig.apiErrorMessage;

  minLengthOfUsername = commonConfig.minLengthOfUsername;
  maxLengthOfUsername = commonConfig.maxLengthOfUsername;
  minLengthOfIc = commonConfig.minLengthOfIc;
  minLengthOfPhoneNumber = commonConfig.minLengthOfPhoneNumber;
  maxLengthOfPhoneNumber = commonConfig.maxLengthOfPhoneNumber;

  editUserInformationPanelMode = false;

  loggedInUser: User;
  editingUserInformation: User;

  editingUserFormGroup: FormGroup;

  updateUserInfoSubscription: any;

  constructor(
      private ngZone: NgZone,
      private authenticationService: AuthenticationService,
      private router: Router,
      private globalFunctionService: GlobalfunctionService,
      private userControllerServicesService: UserControllerServiceService,
      private loadingService: LoadingService,
      private navController: NavController
  ) {
    console.log(this.constructorName + 'Initializing component');
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.editingUserFormGroup = new FormGroup({
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
        userIcNoFc: new FormControl(null, [
          Validators.required,
          Validators.minLength(this.minLengthOfIc),
          Validators.maxLength(this.minLengthOfIc),
          Validators.pattern(this.icNoRegex)
        ]),
        userTel1Fc: new FormControl(null, [
          Validators.required,
          Validators.minLength(this.minLengthOfPhoneNumber),
          Validators.maxLength(this.maxLengthOfPhoneNumber),
          Validators.pattern(this.phoneNumberRegex)
        ]),
        userAddress1Fc: new FormControl(null, [
          Validators.required
        ])
      });
      // this.initializeUserInfo();
    });
  }

  ngOnDestroy() {
    console.log(this.constructorName + 'ngOnDestroy');
  }

  ionViewWillEnter() {
    console.log(this.constructorName + 'IonViewWillEnter');
    if (this.editUserInformationPanelMode) {
      this.enableEditingUser();
    }
  }

  ionViewWillLeave() {
    console.log(this.constructorName + 'IonViewWillLeave');
  }

  enableEditingUser() {
    this.editUserInformationPanelMode = !this.editUserInformationPanelMode;
    if (this.editUserInformationPanelMode) {
      this.editingUserFormGroup.reset();
      this.editingUserInformation = Object.assign({}, this.loggedInUser);
    }
  }

  initializeUserInfo() {
    this.authenticationService.authenticate().then(resp => {
      if (resp.status) {
        if (resp.status === 200) {
          this.loggedInUser = resp.data;
          this.editingUserInformation = Object.assign({}, this.loggedInUser);
        }
      } else {
        if (resp.name === 'Error') {
          this.loggedInUser = null;
          this.globalFunctionService.simpleToast('ERROR!', 'You are not authenticated, please login first!', 'danger');
          this.router.navigate(['/login']);
        }
      }
    }, error => {
      this.loggedInUser = null;
      this.globalFunctionService.simpleToast('ERROR!', 'You are not authenticated, please login first!', 'danger');
      this.router.navigate(['/login']);
    });
  }

  updateUserInfo() {
    // TODO: Add last_updated date here
    this.ngZone.run(() => {
      this.loadingService.present();
      this.updateUserInfoSubscription = this.userControllerServicesService.updateUserByUid(
          this.editingUserInformation.uid.toString(),
          this.editingUserInformation.name,
          this.editingUserInformation.email,
          this.editingUserInformation.country,
          this.editingUserInformation.tel1,
          this.editingUserInformation.address1,
          this.editingUserInformation.city,
          this.editingUserInformation.postcode,
          this.editingUserInformation.state,
          this.editingUserInformation.icno
      ).subscribe(resp => {
        if (resp.code === 200) {
          this.initializeUserInfo();
          this.enableEditingUser();
          this.globalFunctionService.simpleToast('SUCCESS!', 'Your profile has been updated.', 'success');
        } else {
          this.globalFunctionService.simpleToast('ERROR!', 'Updated failed, please try again later.', 'danger');
        }
      }, error => {
        this.globalFunctionService.simpleToast('ERROR!', this.apiErrorMessage, 'dark');
        this.loadingService.dismiss();
      }, () => {
        this.loadingService.dismiss();
      });
    });
  }

  logoutUser() {
    this.authenticationService.logoutUser();
    this.globalFunctionService.simpleToast('SUCCESS!', 'You have been logged out.', 'primary');
    this.navController.navigateRoot('/login');
  }
}

