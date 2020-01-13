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

    constructorName = '[' + this.constructor.name + ']';

    baseLink: any;
    requestConfig: any;

    constructor(
        private laravelPassport: LaravelPassportService,
        private globalFunctionService: GlobalfunctionService,
        private storage: Storage,
        private router: Router,
        private loadingService: LoadingService
    ) {
        console.log(this.constructorName + 'Initializing component');
        this.baseLink = commonConfig.baseLink;
    }

    async authenticate() {
        this.loadingService.present();
        this.requestConfig = {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        };
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
            this.globalFunctionService.simpleToast('SUCCESS!', 'You are logged in!', 'primary');
            this.router.navigate(['/ipoh-drum/home']);
            this.loadingService.dismiss();
        }, err => {
            this.globalFunctionService.simpleToast('WARNING!', 'Email and Password mismatched!', 'danger');
            this.loadingService.dismiss();
        });
    }

    isUserLoggedIn() {
        return this.laravelPassport.isUserLoggedIn();
    }

    logoutUser() {
        this.laravelPassport.logout();
    }
}
