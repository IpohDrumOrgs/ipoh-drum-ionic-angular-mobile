import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../_dal/common/services/authentication.service';
import {User, UserControllerServiceService} from '../../_dal/ipohdrum';
import {Router} from '@angular/router';
import {GlobalfunctionService} from '../../_dal/common/services/globalfunction.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {commonConfig} from '../../_dal/common/commonConfig';
import {LoadingService} from '../../_dal/common/services/loading.service';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss'],
})
export class UserProfileDetailsComponent implements OnInit, OnDestroy {

  userNameRegex = commonConfig.userNameRegex;
  icNoRegex = commonConfig.icNoRegex;
  phoneNumberRegex = commonConfig.phoneNumberRegex;

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
      private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
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
          Validators.maxLength(this.maxLengthOfPhoneNumber),
          Validators.pattern(this.phoneNumberRegex)
      ]),
      userAddress1Fc: new FormControl(null, [
          Validators.required
      ])
    });
    this.initializeUserInfo();
  }

  ngOnDestroy() {
    this.ngZone.run(() => {
      if (this.updateUserInfoSubscription) {
        this.updateUserInfoSubscription.unsubscribe();
      }
    });
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
          this.globalFunctionService.simpleToast('Error!', 'You are not authenticated, please login first!', 'danger');
          this.router.navigate(['/login']);
        }
      }
    }, error => {
      this.loggedInUser = null;
      this.globalFunctionService.simpleToast('Error!', 'You are not authenticated, please login first!', 'danger');
      this.router.navigate(['/login']);
    });
  }

  updateUserInfo() {
    // TODO: Add last_updated date here
    this.ngZone.run(() => {
      this.loadingService.present();
      this.updateUserInfoSubscription = this.userControllerServicesService.updateUserByUserId(
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
          this.globalFunctionService.simpleToast('Success!', 'Your profile has been updated.', 'success');
        } else {
          this.globalFunctionService.simpleToast('Error!', 'Updated failed, please try again later.', 'danger');
        }
      }, error => {
        this.globalFunctionService.simpleToast('Error!', 'Something went wrong, please try again later.', 'dark');
        this.loadingService.dismiss();
      }, () => {
        this.loadingService.dismiss();
      });
    });
  }
}
