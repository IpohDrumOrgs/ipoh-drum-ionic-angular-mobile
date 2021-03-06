import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class AuthzInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.headers.has('Authorization')) {
            const header = request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
            const newRequest = request.clone({headers: header});
            return next.handle(newRequest);
        }
        return next.handle(request);
    }
}
