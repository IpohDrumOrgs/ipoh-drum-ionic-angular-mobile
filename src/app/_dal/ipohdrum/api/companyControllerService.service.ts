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
export class CompanyControllerServiceService {

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
     * Creates a company.
     * @param name Companyname
     * @param companytypeid Company Type ID
     * @param regno Registration No
     * @param email1 Email 1
     * @param email2 Email 2
     * @param tel1 Contact No 1
     * @param tel2 Contact No 2
     * @param fax1 Fax
     * @param fax2 Fax 2
     * @param address1 Address
     * @param address2 Address 2
     * @param postcode Post Code
     * @param state State
     * @param city City
     * @param country Country
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createCompany(name: string, companytypeid: number, regno: string, email1?: string, email2?: string, tel1?: string, tel2?: string, fax1?: string, fax2?: string, address1?: string, address2?: string, postcode?: string, state?: string, city?: string, country?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createCompany(name: string, companytypeid: number, regno: string, email1?: string, email2?: string, tel1?: string, tel2?: string, fax1?: string, fax2?: string, address1?: string, address2?: string, postcode?: string, state?: string, city?: string, country?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createCompany(name: string, companytypeid: number, regno: string, email1?: string, email2?: string, tel1?: string, tel2?: string, fax1?: string, fax2?: string, address1?: string, address2?: string, postcode?: string, state?: string, city?: string, country?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createCompany(name: string, companytypeid: number, regno: string, email1?: string, email2?: string, tel1?: string, tel2?: string, fax1?: string, fax2?: string, address1?: string, address2?: string, postcode?: string, state?: string, city?: string, country?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling createCompany.');
        }
        if (companytypeid === null || companytypeid === undefined) {
            throw new Error('Required parameter companytypeid was null or undefined when calling createCompany.');
        }
        if (regno === null || regno === undefined) {
            throw new Error('Required parameter regno was null or undefined when calling createCompany.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }
        if (companytypeid !== undefined && companytypeid !== null) {
            queryParameters = queryParameters.set('companytypeid', <any>companytypeid);
        }
        if (email1 !== undefined && email1 !== null) {
            queryParameters = queryParameters.set('email1', <any>email1);
        }
        if (email2 !== undefined && email2 !== null) {
            queryParameters = queryParameters.set('email2', <any>email2);
        }
        if (regno !== undefined && regno !== null) {
            queryParameters = queryParameters.set('regno', <any>regno);
        }
        if (tel1 !== undefined && tel1 !== null) {
            queryParameters = queryParameters.set('tel1', <any>tel1);
        }
        if (tel2 !== undefined && tel2 !== null) {
            queryParameters = queryParameters.set('tel2', <any>tel2);
        }
        if (fax1 !== undefined && fax1 !== null) {
            queryParameters = queryParameters.set('fax1', <any>fax1);
        }
        if (fax2 !== undefined && fax2 !== null) {
            queryParameters = queryParameters.set('fax2', <any>fax2);
        }
        if (address1 !== undefined && address1 !== null) {
            queryParameters = queryParameters.set('address1', <any>address1);
        }
        if (address2 !== undefined && address2 !== null) {
            queryParameters = queryParameters.set('address2', <any>address2);
        }
        if (postcode !== undefined && postcode !== null) {
            queryParameters = queryParameters.set('postcode', <any>postcode);
        }
        if (state !== undefined && state !== null) {
            queryParameters = queryParameters.set('state', <any>state);
        }
        if (city !== undefined && city !== null) {
            queryParameters = queryParameters.set('city', <any>city);
        }
        if (country !== undefined && country !== null) {
            queryParameters = queryParameters.set('Country', <any>country);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.post<any>(`${this.configuration.basePath}/api/company`,
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
     * Set company\&#39;s \&#39;status\&#39; to 0.
     * @param uid Company ID, NOT \&#39;ID\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteCompanyByUid(uid: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteCompanyByUid(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteCompanyByUid(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteCompanyByUid(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling deleteCompanyByUid.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.delete<any>(`${this.configuration.basePath}/api/company/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Filter list of companies
     * Returns list of filtered companies
     * @param pageNumber Page number
     * @param pageSize number of pageSize
     * @param keyword Keyword for filter
     * @param fromdate From Date for filter
     * @param todate To string for filter
     * @param status status for filter
     * @param companyId Company id for filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public filterCompanyList(pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, companyId?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public filterCompanyList(pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, companyId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public filterCompanyList(pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, companyId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public filterCompanyList(pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, companyId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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
        if (companyId !== undefined && companyId !== null) {
            queryParameters = queryParameters.set('company_id', <any>companyId);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/filter/company`,
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
     * Filter list of plucked companies
     * Returns list of filtered companies
     * @param cols Columns for pluck
     * @param pageNumber Page number
     * @param pageSize number of pageSize
     * @param keyword Keyword for filter
     * @param fromdate From Date for filter
     * @param todate To string for filter
     * @param status status for filter
     * @param companyId Company id for filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public filterPluckedCompanyList(cols: string, pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, companyId?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public filterPluckedCompanyList(cols: string, pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, companyId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public filterPluckedCompanyList(cols: string, pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, companyId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public filterPluckedCompanyList(cols: string, pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, companyId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (cols === null || cols === undefined) {
            throw new Error('Required parameter cols was null or undefined when calling filterPluckedCompanyList.');
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
        if (companyId !== undefined && companyId !== null) {
            queryParameters = queryParameters.set('company_id', <any>companyId);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/pluck/filter/company`,
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
     * Retrieves company by Uid.
     * @param uid Company_ID, NOT \&#39;ID\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCompanyByUid(uid: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getCompanyByUid(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getCompanyByUid(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getCompanyByUid(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling getCompanyByUid.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/company/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get list of companies
     * Returns list of companies
     * @param pageNumber Page number
     * @param pageSize number of pageSize
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCompanyList(pageNumber?: number, pageSize?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getCompanyList(pageNumber?: number, pageSize?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getCompanyList(pageNumber?: number, pageSize?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getCompanyList(pageNumber?: number, pageSize?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/company`,
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
     * pluck company
     * Returns plucked companies
     * @param uid Company_ID, NOT \&#39;ID\&#39;.
     * @param cols Columns for pluck
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public pluckCompanyByUid(uid: string, cols: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public pluckCompanyByUid(uid: string, cols: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public pluckCompanyByUid(uid: string, cols: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public pluckCompanyByUid(uid: string, cols: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling pluckCompanyByUid.');
        }
        if (cols === null || cols === undefined) {
            throw new Error('Required parameter cols was null or undefined when calling pluckCompanyByUid.');
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


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/pluck/company/${encodeURIComponent(String(uid))}`,
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
     * pluck list of companies
     * Returns list of plucked companies
     * @param cols Columns for pluck
     * @param pageNumber Page number
     * @param pageSize number of pageSize
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public pluckCompanyList(cols: string, pageNumber?: number, pageSize?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public pluckCompanyList(cols: string, pageNumber?: number, pageSize?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public pluckCompanyList(cols: string, pageNumber?: number, pageSize?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public pluckCompanyList(cols: string, pageNumber?: number, pageSize?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (cols === null || cols === undefined) {
            throw new Error('Required parameter cols was null or undefined when calling pluckCompanyList.');
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


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/pluck/companies`,
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
     * Update company by Uid.
     * @param uid Company_ID, NOT \&#39;ID\&#39;.
     * @param name Companyname
     * @param companytypeid Company Type ID
     * @param regno Registration No
     * @param email1 Email 1
     * @param email2 Email 2
     * @param tel1 Contact No 1
     * @param tel2 Contact No 2
     * @param fax1 Fax
     * @param fax2 Fax 2
     * @param address1 Address
     * @param address2 Address 2
     * @param postcode Post Code
     * @param state State
     * @param city City
     * @param country Country
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateCompanyByUid(uid: string, name: string, companytypeid: number, regno: string, email1?: string, email2?: string, tel1?: string, tel2?: string, fax1?: string, fax2?: string, address1?: string, address2?: string, postcode?: string, state?: string, city?: string, country?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateCompanyByUid(uid: string, name: string, companytypeid: number, regno: string, email1?: string, email2?: string, tel1?: string, tel2?: string, fax1?: string, fax2?: string, address1?: string, address2?: string, postcode?: string, state?: string, city?: string, country?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateCompanyByUid(uid: string, name: string, companytypeid: number, regno: string, email1?: string, email2?: string, tel1?: string, tel2?: string, fax1?: string, fax2?: string, address1?: string, address2?: string, postcode?: string, state?: string, city?: string, country?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateCompanyByUid(uid: string, name: string, companytypeid: number, regno: string, email1?: string, email2?: string, tel1?: string, tel2?: string, fax1?: string, fax2?: string, address1?: string, address2?: string, postcode?: string, state?: string, city?: string, country?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling updateCompanyByUid.');
        }
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling updateCompanyByUid.');
        }
        if (companytypeid === null || companytypeid === undefined) {
            throw new Error('Required parameter companytypeid was null or undefined when calling updateCompanyByUid.');
        }
        if (regno === null || regno === undefined) {
            throw new Error('Required parameter regno was null or undefined when calling updateCompanyByUid.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }
        if (companytypeid !== undefined && companytypeid !== null) {
            queryParameters = queryParameters.set('companytypeid', <any>companytypeid);
        }
        if (email1 !== undefined && email1 !== null) {
            queryParameters = queryParameters.set('email1', <any>email1);
        }
        if (email2 !== undefined && email2 !== null) {
            queryParameters = queryParameters.set('email2', <any>email2);
        }
        if (regno !== undefined && regno !== null) {
            queryParameters = queryParameters.set('regno', <any>regno);
        }
        if (tel1 !== undefined && tel1 !== null) {
            queryParameters = queryParameters.set('tel1', <any>tel1);
        }
        if (tel2 !== undefined && tel2 !== null) {
            queryParameters = queryParameters.set('tel2', <any>tel2);
        }
        if (fax1 !== undefined && fax1 !== null) {
            queryParameters = queryParameters.set('fax1', <any>fax1);
        }
        if (fax2 !== undefined && fax2 !== null) {
            queryParameters = queryParameters.set('fax2', <any>fax2);
        }
        if (address1 !== undefined && address1 !== null) {
            queryParameters = queryParameters.set('address1', <any>address1);
        }
        if (address2 !== undefined && address2 !== null) {
            queryParameters = queryParameters.set('address2', <any>address2);
        }
        if (postcode !== undefined && postcode !== null) {
            queryParameters = queryParameters.set('postcode', <any>postcode);
        }
        if (state !== undefined && state !== null) {
            queryParameters = queryParameters.set('state', <any>state);
        }
        if (city !== undefined && city !== null) {
            queryParameters = queryParameters.set('city', <any>city);
        }
        if (country !== undefined && country !== null) {
            queryParameters = queryParameters.set('Country', <any>country);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.put<any>(`${this.configuration.basePath}/api/company/${encodeURIComponent(String(uid))}`,
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