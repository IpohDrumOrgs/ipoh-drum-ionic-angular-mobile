import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Storage} from '@ionic/storage';

@Injectable()
export class AuthzInterceptor implements HttpInterceptor {

    constructor(
        private deviceService: DeviceDetectorService,
        private storage: Storage
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.headers.has('Authorization')) {
            if (this.deviceService.isDesktop()) {
                let header = request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
                const newRequest = request.clone({headers: header});
                return next.handle(newRequest);
            } else {
                let deviceStorageAccessToken = '';
                this.storage.get('access_token').then((val) => {
                    deviceStorageAccessToken = val;
                    let header = request.headers.set('Authorization', 'Bearer ' + deviceStorageAccessToken);
                    const newRequest = request.clone({headers: header});
                    return next.handle(newRequest);
                });
            }
        } else {
            return next.handle(request);
        }
    }
}
