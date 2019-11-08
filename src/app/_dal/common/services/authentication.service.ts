import {Injectable} from '@angular/core';
import {LaravelPassportService} from 'laravel-passport';
import {GlobalfunctionService} from './globalfunction.service';
import {commonConfig} from '../commonConfig';
import axios from 'axios';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  baseLink: any;
  requestConfig: any;
  private user: any;

  constructor(
    private laravelPassport: LaravelPassportService,
    private globalFunctionService: GlobalfunctionService,
    private storage: Storage,
    private router: Router
  ) {
    this.baseLink = commonConfig.baseLink;
    this.requestConfig = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    };
  }

  async authenticate() {
    try {
      return await axios.post(this.baseLink + '/authentication', null,
          this.requestConfig
      ).then((res) => {
        return res;
      }, err => {
        return JSON.parse(JSON.stringify(err));
      });
    } catch (error) {
      return error.response;
    }
  }

  async login(data) {
    this.laravelPassport.loginWithEmailAndPassword(data.email, data.password).subscribe(res => {
      localStorage.setItem('access_token', res.access_token);
      this.storage.set('access_token', res.access_token);
      this.globalFunctionService.simpleToast(undefined, 'Successfully logged in!', 'primary');
      this.router.navigate(['/home']);
    }, err => {
      this.globalFunctionService.simpleToast('Warning!', 'Email and Password mismatched!', 'danger');
    });
  }
  
  isUserLoggedIn() {
    return this.laravelPassport.isUserLoggedIn();
  }

  logoutUser() {
    this.laravelPassport.logout();
  }
}
