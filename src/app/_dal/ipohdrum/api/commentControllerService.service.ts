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
export class CommentControllerServiceService {

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
     * Creates a comment.
     * @param name Commentname
     * @param email Email
     * @param password Password
     * @param password_confirmation Password Confirmation
     * @param country Country
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createComment(name: string, email: string, password: string, password_confirmation: string, country?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createComment(name: string, email: string, password: string, password_confirmation: string, country?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createComment(name: string, email: string, password: string, password_confirmation: string, country?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createComment(name: string, email: string, password: string, password_confirmation: string, country?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling createComment.');
        }
        if (email === null || email === undefined) {
            throw new Error('Required parameter email was null or undefined when calling createComment.');
        }
        if (password === null || password === undefined) {
            throw new Error('Required parameter password was null or undefined when calling createComment.');
        }
        if (password_confirmation === null || password_confirmation === undefined) {
            throw new Error('Required parameter password_confirmation was null or undefined when calling createComment.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }
        if (email !== undefined && email !== null) {
            queryParameters = queryParameters.set('email', <any>email);
        }
        if (password !== undefined && password !== null) {
            queryParameters = queryParameters.set('password', <any>password);
        }
        if (password_confirmation !== undefined && password_confirmation !== null) {
            queryParameters = queryParameters.set('password_confirmation', <any>password_confirmation);
        }
        if (country !== undefined && country !== null) {
            queryParameters = queryParameters.set('country', <any>country);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.post<any>(`${this.configuration.basePath}/api/comment`,
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
     * Set comment\&#39;s \&#39;status\&#39; to 0.
     * @param uid Comment ID, NOT \&#39;ID\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteCommentByUid(uid: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteCommentByUid(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteCommentByUid(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteCommentByUid(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling deleteCommentByUid.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.delete<any>(`${this.configuration.basePath}/api/comment/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Filter list of comments
     * Returns list of filtered comments
     * @param page_number Page number
     * @param page_size number of pageSize
     * @param keyword Keyword for filter
     * @param fromdate From Date for filter
     * @param todate To string for filter
     * @param status status for filter
     * @param company_id Company id for filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public filterComments(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, company_id?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public filterComments(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, company_id?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public filterComments(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, company_id?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public filterComments(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, company_id?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (page_number !== undefined && page_number !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>page_number);
        }
        if (page_size !== undefined && page_size !== null) {
            queryParameters = queryParameters.set('pageSize', <any>page_size);
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
        if (company_id !== undefined && company_id !== null) {
            queryParameters = queryParameters.set('company_id', <any>company_id);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/filter/comment`,
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
     * Retrieves comment by Uid.
     * @param uid Comment_ID, NOT \&#39;ID\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCommentByUid(uid: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getCommentByUid(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getCommentByUid(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getCommentByUid(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling getCommentByUid.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/comment/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get list of comments
     * Returns list of comments
     * @param page_number Page number
     * @param page_size number of pageSize
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getComments(page_number?: number, page_size?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getComments(page_number?: number, page_size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getComments(page_number?: number, page_size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getComments(page_number?: number, page_size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (page_number !== undefined && page_number !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>page_number);
        }
        if (page_size !== undefined && page_size !== null) {
            queryParameters = queryParameters.set('pageSize', <any>page_size);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/comment`,
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
     * Update comment by Uid.
     * @param uid Comment_ID, NOT \&#39;ID\&#39;.
     * @param name Commentname.
     * @param email Email.
     * @param country Country.
     * @param tel1 Telephone Number #1.
     * @param address1 Address #1.
     * @param city City.
     * @param postcode PostCode.
     * @param state State.
     * @param icno IC Number.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateCommentByUid(uid: string, name: string, email: string, country: string, tel1?: string, address1?: string, city?: string, postcode?: string, state?: string, icno?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateCommentByUid(uid: string, name: string, email: string, country: string, tel1?: string, address1?: string, city?: string, postcode?: string, state?: string, icno?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateCommentByUid(uid: string, name: string, email: string, country: string, tel1?: string, address1?: string, city?: string, postcode?: string, state?: string, icno?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateCommentByUid(uid: string, name: string, email: string, country: string, tel1?: string, address1?: string, city?: string, postcode?: string, state?: string, icno?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling updateCommentByUid.');
        }
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling updateCommentByUid.');
        }
        if (email === null || email === undefined) {
            throw new Error('Required parameter email was null or undefined when calling updateCommentByUid.');
        }
        if (country === null || country === undefined) {
            throw new Error('Required parameter country was null or undefined when calling updateCommentByUid.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }
        if (email !== undefined && email !== null) {
            queryParameters = queryParameters.set('email', <any>email);
        }
        if (tel1 !== undefined && tel1 !== null) {
            queryParameters = queryParameters.set('tel1', <any>tel1);
        }
        if (address1 !== undefined && address1 !== null) {
            queryParameters = queryParameters.set('address1', <any>address1);
        }
        if (city !== undefined && city !== null) {
            queryParameters = queryParameters.set('city', <any>city);
        }
        if (postcode !== undefined && postcode !== null) {
            queryParameters = queryParameters.set('postcode', <any>postcode);
        }
        if (state !== undefined && state !== null) {
            queryParameters = queryParameters.set('state', <any>state);
        }
        if (country !== undefined && country !== null) {
            queryParameters = queryParameters.set('country', <any>country);
        }
        if (icno !== undefined && icno !== null) {
            queryParameters = queryParameters.set('icno', <any>icno);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.put<any>(`${this.configuration.basePath}/api/comment/${encodeURIComponent(String(uid))}`,
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
