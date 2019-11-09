import {Injectable} from '@angular/core';
import {LaravelPassportService} from 'laravel-passport';
import {GlobalfunctionService} from './globalfunction.service';
import {commonConfig} from '../commonConfig';
import axios from 'axios';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {LoadingService} from './loading.service';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    baseLink: any;
    requestConfig: any;

    constructor(
        private laravelPassport: LaravelPassportService,
        private globalFunctionService: GlobalfunctionService,
        private storage: Storage,
        private router: Router,
        private loadingService: LoadingService
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
        this.loadingService.present();
        try {
            return await axios.post(this.baseLink + '/authentication', null,
                this.requestConfig
            ).then((res) => {
                this.loadingService.dismiss();
                return res;
            }, err => {
                this.loadingService.dismiss();
                return JSON.parse(JSON.stringify(err));
            });
        } catch (error) {
            this.loadingService.dismiss();
            return error.response;
        }
    }

    async login(data) {
        this.loadingService.present();
        this.laravelPassport.loginWithEmailAndPassword(data.email, data.password).subscribe(res => {
            localStorage.setItem('access_token', res.access_token);
            this.storage.set('access_token', res.access_token);
            this.loadingService.dismiss();
            this.globalFunctionService.simpleToast(undefined, 'Successfully logged in!', 'primary');
            this.router.navigate(['/ipoh-drum/home']);
        }, err => {
            this.loadingService.dismiss();
            this.globalFunctionService.simpleToast('WARNING!', 'Email and Password mismatched!', 'danger');
        });
    }

    isUserLoggedIn() {
        return this.laravelPassport.isUserLoggedIn();
    }

    logoutUser() {
        this.laravelPassport.logout();
    }
}
