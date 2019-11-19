/**
 * Ipoh Drum Laravel API
 * This is a swagger-generated API documentation for the project Ipoh Drum. (Only supports OpenAPI Annotations for now.)
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: henry_lcz97@hotmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';


import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class VerificationCodeControllerServiceService {

    protected basePath = 'http://localhost:8000';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    /**
     * Creates a verificationcode.
     * @param ticketid Verification belongs to which Ticket
     * @param code VerificationCode
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createVerificationCode(ticketid: number, code: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createVerificationCode(ticketid: number, code: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createVerificationCode(ticketid: number, code: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createVerificationCode(ticketid: number, code: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (ticketid === null || ticketid === undefined) {
            throw new Error('Required parameter ticketid was null or undefined when calling createVerificationCode.');
        }
        if (code === null || code === undefined) {
            throw new Error('Required parameter code was null or undefined when calling createVerificationCode.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (ticketid !== undefined && ticketid !== null) {
            queryParameters = queryParameters.set('ticketid', <any>ticketid);
        }
        if (code !== undefined && code !== null) {
            queryParameters = queryParameters.set('code', <any>code);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.post<any>(`${this.configuration.basePath}/api/verificationcode`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Set verificationcode\&#39;s \&#39;status\&#39; to 0.
     * @param uid VerificationCode ID, NOT \&#39;ID\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteVerificationCodeByUid(uid: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteVerificationCodeByUid(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteVerificationCodeByUid(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteVerificationCodeByUid(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling deleteVerificationCodeByUid.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.delete<any>(`${this.configuration.basePath}/api/verificationcode/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Filter list of plucked verificationcodes
     * Returns list of filtered verificationcodes
     * @param cols Columns for pluck
     * @param pageNumber Page number
     * @param pageSize Page size
     * @param keyword Keyword for filter
     * @param fromdate From Date for filter
     * @param todate To string for filter
     * @param status status for filter
     * @param onverificationcode onverificationcode for filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public filterPluckedVerificationCodeList(cols: string, pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, onverificationcode?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public filterPluckedVerificationCodeList(cols: string, pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, onverificationcode?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public filterPluckedVerificationCodeList(cols: string, pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, onverificationcode?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public filterPluckedVerificationCodeList(cols: string, pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, onverificationcode?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (cols === null || cols === undefined) {
            throw new Error('Required parameter cols was null or undefined when calling filterPluckedVerificationCodeList.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pageNumber !== undefined && pageNumber !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('pageSize', <any>pageSize);
        }
        if (cols !== undefined && cols !== null) {
            queryParameters = queryParameters.set('cols', <any>cols);
        }
        if (keyword !== undefined && keyword !== null) {
            queryParameters = queryParameters.set('keyword', <any>keyword);
        }
        if (fromdate !== undefined && fromdate !== null) {
            queryParameters = queryParameters.set('fromdate', <any>fromdate);
        }
        if (todate !== undefined && todate !== null) {
            queryParameters = queryParameters.set('todate', <any>todate);
        }
        if (status !== undefined && status !== null) {
            queryParameters = queryParameters.set('status', <any>status);
        }
        if (onverificationcode !== undefined && onverificationcode !== null) {
            queryParameters = queryParameters.set('onverificationcode', <any>onverificationcode);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/pluck/filter/verificationcode`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Filter list of verificationcodes
     * Returns list of filtered verificationcodes
     * @param pageNumber Page number
     * @param pageSize Page size
     * @param keyword Keyword for filter
     * @param fromdate From Date for filter
     * @param todate To string for filter
     * @param status status for filter
     * @param onverificationcode onverificationcode for filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public filterVerificationCodeList(pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, onverificationcode?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public filterVerificationCodeList(pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, onverificationcode?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public filterVerificationCodeList(pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, onverificationcode?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public filterVerificationCodeList(pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, onverificationcode?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pageNumber !== undefined && pageNumber !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('pageSize', <any>pageSize);
        }
        if (keyword !== undefined && keyword !== null) {
            queryParameters = queryParameters.set('keyword', <any>keyword);
        }
        if (fromdate !== undefined && fromdate !== null) {
            queryParameters = queryParameters.set('fromdate', <any>fromdate);
        }
        if (todate !== undefined && todate !== null) {
            queryParameters = queryParameters.set('todate', <any>todate);
        }
        if (status !== undefined && status !== null) {
            queryParameters = queryParameters.set('status', <any>status);
        }
        if (onverificationcode !== undefined && onverificationcode !== null) {
            queryParameters = queryParameters.set('onverificationcode', <any>onverificationcode);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/filter/verificationcode`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Retrieves verificationcode by Uid.
     * @param uid VerificationCode_ID, NOT \&#39;ID\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getVerificationCodeByUid(uid: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getVerificationCodeByUid(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getVerificationCodeByUid(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getVerificationCodeByUid(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling getVerificationCodeByUid.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/verificationcode/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get list of verificationcodes
     * Returns list of verificationcodes
     * @param pageNumber Page number.
     * @param pageSize Page size.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getVerificationCodeList(pageNumber?: number, pageSize?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getVerificationCodeList(pageNumber?: number, pageSize?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getVerificationCodeList(pageNumber?: number, pageSize?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getVerificationCodeList(pageNumber?: number, pageSize?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pageNumber !== undefined && pageNumber !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('pageSize', <any>pageSize);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/verificationcode`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * pluck verificationcode
     * Returns plucked verificationcodes
     * @param uid VerificationCode_ID, NOT \&#39;ID\&#39;.
     * @param cols Columns for pluck
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public pluckVerificationCodeByUid(uid: string, cols: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public pluckVerificationCodeByUid(uid: string, cols: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public pluckVerificationCodeByUid(uid: string, cols: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public pluckVerificationCodeByUid(uid: string, cols: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling pluckVerificationCodeByUid.');
        }
        if (cols === null || cols === undefined) {
            throw new Error('Required parameter cols was null or undefined when calling pluckVerificationCodeByUid.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (cols !== undefined && cols !== null) {
            queryParameters = queryParameters.set('cols', <any>cols);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/pluck/verificationcode/${encodeURIComponent(String(uid))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * pluck list of verificationcodes
     * Returns list of plucked verificationcodes
     * @param cols Columns for pluck
     * @param pageNumber Page number
     * @param pageSize Page size
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public pluckVerificationCodeList(cols: string, pageNumber?: number, pageSize?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public pluckVerificationCodeList(cols: string, pageNumber?: number, pageSize?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public pluckVerificationCodeList(cols: string, pageNumber?: number, pageSize?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public pluckVerificationCodeList(cols: string, pageNumber?: number, pageSize?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (cols === null || cols === undefined) {
            throw new Error('Required parameter cols was null or undefined when calling pluckVerificationCodeList.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pageNumber !== undefined && pageNumber !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('pageSize', <any>pageSize);
        }
        if (cols !== undefined && cols !== null) {
            queryParameters = queryParameters.set('cols', <any>cols);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/pluck/verificationcodes`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update verificationcode by Uid.
     * @param uid VerificationCode_ID, NOT \&#39;ID\&#39;.
     * @param ticketid Verification belongs to which Ticket
     * @param code VerificationCode
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateVerificationCodeByUid(uid: string, ticketid: number, code: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateVerificationCodeByUid(uid: string, ticketid: number, code: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateVerificationCodeByUid(uid: string, ticketid: number, code: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateVerificationCodeByUid(uid: string, ticketid: number, code: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling updateVerificationCodeByUid.');
        }
        if (ticketid === null || ticketid === undefined) {
            throw new Error('Required parameter ticketid was null or undefined when calling updateVerificationCodeByUid.');
        }
        if (code === null || code === undefined) {
            throw new Error('Required parameter code was null or undefined when calling updateVerificationCodeByUid.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (ticketid !== undefined && ticketid !== null) {
            queryParameters = queryParameters.set('ticketid', <any>ticketid);
        }
        if (code !== undefined && code !== null) {
            queryParameters = queryParameters.set('code', <any>code);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.put<any>(`${this.configuration.basePath}/api/verificationcode/${encodeURIComponent(String(uid))}`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}