import { Injectable } from '@angular/core';
import { LaravelPassportService } from 'laravel-passport';
import { GlobalfunctionService } from '../services/globalfunction.service';
import { commonConfig } from '../commonConfig';
import axios from 'axios';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  baseLink: any;
  requestConfig: any;
  private authenticated = false;
  private user: any;

  constructor(
    private laravelPassport: LaravelPassportService,
    private globalFunctionService: GlobalfunctionService,
    private storage: Storage
    ) {
        this.baseLink = commonConfig.baseLink;
        this.requestConfig = {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        };
    // this.requestConfig = apiService.requestConfig;
  }

  async authenticate(token) {
    try {
      const response = await axios.post(this.baseLink + '/authentication', {token: token} , this.requestConfig).then((response) => {
        this.authenticated = true;
        this.user = response.data;
        console.log(response);
      });
    } catch {
      this.authenticated = false;
    }
  }

  async login(data) {
    const response = await this.laravelPassport.loginWithEmailAndPassword(data.email , data.password).subscribe(
      res => {
        localStorage.setItem('access_token', res.access_token);
        this.storage.set('access_token',  res.access_token);
        return true;
      },
      err => {
        this.globalFunctionService.simpleToast('Email and Password didn\' t matched');
        return false;
      }
    );
  }
}
