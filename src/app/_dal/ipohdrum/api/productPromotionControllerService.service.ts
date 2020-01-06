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
export class ProductPromotionControllerServiceService {

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
     * Creates a productpromotion.
     * @param name ProductPromotionname
     * @param discbyprice Promotion discount by price
     * @param store_id Store ID
     * @param desc Promotion description
     * @param qty Limited Qty
     * @param disc Promotion Discount
     * @param discpctg Promotion Discount Percentage
     * @param promostartdate Promotion Start Date
     * @param promoenddate Promotion End Date
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createProductPromotion(name: string, discbyprice: number, store_id?: number, desc?: string, qty?: number, disc?: number, discpctg?: number, promostartdate?: string, promoenddate?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createProductPromotion(name: string, discbyprice: number, store_id?: number, desc?: string, qty?: number, disc?: number, discpctg?: number, promostartdate?: string, promoenddate?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createProductPromotion(name: string, discbyprice: number, store_id?: number, desc?: string, qty?: number, disc?: number, discpctg?: number, promostartdate?: string, promoenddate?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createProductPromotion(name: string, discbyprice: number, store_id?: number, desc?: string, qty?: number, disc?: number, discpctg?: number, promostartdate?: string, promoenddate?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling createProductPromotion.');
        }
        if (discbyprice === null || discbyprice === undefined) {
            throw new Error('Required parameter discbyprice was null or undefined when calling createProductPromotion.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (store_id !== undefined && store_id !== null) {
            queryParameters = queryParameters.set('store_id', <any>store_id);
        }
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }
        if (desc !== undefined && desc !== null) {
            queryParameters = queryParameters.set('desc', <any>desc);
        }
        if (qty !== undefined && qty !== null) {
            queryParameters = queryParameters.set('qty', <any>qty);
        }
        if (disc !== undefined && disc !== null) {
            queryParameters = queryParameters.set('disc', <any>disc);
        }
        if (discpctg !== undefined && discpctg !== null) {
            queryParameters = queryParameters.set('discpctg', <any>discpctg);
        }
        if (discbyprice !== undefined && discbyprice !== null) {
            queryParameters = queryParameters.set('discbyprice', <any>discbyprice);
        }
        if (promostartdate !== undefined && promostartdate !== null) {
            queryParameters = queryParameters.set('promostartdate', <any>promostartdate);
        }
        if (promoenddate !== undefined && promoenddate !== null) {
            queryParameters = queryParameters.set('promoenddate', <any>promoenddate);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.post<any>(`${this.configuration.basePath}/api/productpromotion`,
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
     * Set productpromotion\&#39;s \&#39;status\&#39; to 0.
     * @param uid ProductPromotion ID, NOT \&#39;ID\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteProductPromotionByUid(uid: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteProductPromotionByUid(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteProductPromotionByUid(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteProductPromotionByUid(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling deleteProductPromotionByUid.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.delete<any>(`${this.configuration.basePath}/api/productpromotion/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Filter list of productpromotions
     * Returns list of filtered productpromotions
     * @param page_number Page number
     * @param page_size number of pageSize
     * @param keyword Keyword for filter
     * @param fromdate From Date for filter
     * @param todate To date for filter
     * @param status status for filter
     * @param store_id store id for filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public filterProductPromotions(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, store_id?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public filterProductPromotions(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, store_id?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public filterProductPromotions(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, store_id?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public filterProductPromotions(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, store_id?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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
        if (store_id !== undefined && store_id !== null) {
            queryParameters = queryParameters.set('store_id', <any>store_id);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/filter/productpromotion`,
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
     * Retrieves productpromotion by ProductPromotion\&#39;s uid.
     * @param uid ProductPromotion\&#39;s uid, NOT \&#39;id\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getProductPromotionByUid(uid: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getProductPromotionByUid(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getProductPromotionByUid(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getProductPromotionByUid(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling getProductPromotionByUid.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/productpromotion/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get list of productpromotions
     * Returns list of productpromotions
     * @param page_number Page number
     * @param page_size number of pageSize
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getProductPromotions(page_number?: number, page_size?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getProductPromotions(page_number?: number, page_size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getProductPromotions(page_number?: number, page_size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getProductPromotions(page_number?: number, page_size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/productpromotion`,
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
     * Update productpromotion by Uid.
     * @param uid ProductPromotion_ID, NOT \&#39;ID\&#39;.
     * @param name ProductPromotionname
     * @param discbyprice Promotion discount by price
     * @param store_id Store ID
     * @param desc Promotion description
     * @param qty Limited Qty
     * @param disc Promotion Discount
     * @param discpctg Promotion Discount Percentage
     * @param promostartdate Promotion Start Date
     * @param promoenddate Promotion End Date
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateProductPromotionByUid(uid: string, name: string, discbyprice: number, store_id?: number, desc?: string, qty?: number, disc?: number, discpctg?: number, promostartdate?: string, promoenddate?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateProductPromotionByUid(uid: string, name: string, discbyprice: number, store_id?: number, desc?: string, qty?: number, disc?: number, discpctg?: number, promostartdate?: string, promoenddate?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateProductPromotionByUid(uid: string, name: string, discbyprice: number, store_id?: number, desc?: string, qty?: number, disc?: number, discpctg?: number, promostartdate?: string, promoenddate?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateProductPromotionByUid(uid: string, name: string, discbyprice: number, store_id?: number, desc?: string, qty?: number, disc?: number, discpctg?: number, promostartdate?: string, promoenddate?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling updateProductPromotionByUid.');
        }
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling updateProductPromotionByUid.');
        }
        if (discbyprice === null || discbyprice === undefined) {
            throw new Error('Required parameter discbyprice was null or undefined when calling updateProductPromotionByUid.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }
        if (store_id !== undefined && store_id !== null) {
            queryParameters = queryParameters.set('store_id', <any>store_id);
        }
        if (desc !== undefined && desc !== null) {
            queryParameters = queryParameters.set('desc', <any>desc);
        }
        if (qty !== undefined && qty !== null) {
            queryParameters = queryParameters.set('qty', <any>qty);
        }
        if (disc !== undefined && disc !== null) {
            queryParameters = queryParameters.set('disc', <any>disc);
        }
        if (discpctg !== undefined && discpctg !== null) {
            queryParameters = queryParameters.set('discpctg', <any>discpctg);
        }
        if (discbyprice !== undefined && discbyprice !== null) {
            queryParameters = queryParameters.set('discbyprice', <any>discbyprice);
        }
        if (promostartdate !== undefined && promostartdate !== null) {
            queryParameters = queryParameters.set('promostartdate', <any>promostartdate);
        }
        if (promoenddate !== undefined && promoenddate !== null) {
            queryParameters = queryParameters.set('promoenddate', <any>promoenddate);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.put<any>(`${this.configuration.basePath}/api/productpromotion/${encodeURIComponent(String(uid))}`,
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
