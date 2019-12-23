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
export class SaleControllerServiceService {

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
     * Creates a sale.
     * @param name Salename
     * @param storeid Store ID
     * @param sku Sku
     * @param cost Product Cost
     * @param price Product Selling Price
     * @param stock Stock Qty
     * @param onsale On Sale
     * @param code Code
     * @param desc Product Description
     * @param disc Product Discount
     * @param promoprice Promotion Price
     * @param promostartdate Promotion Start Date
     * @param promoenddate Promotion End Date
     * @param warrantyperiod Warranty Period
     * @param stockthreshold Stock Threshold
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createSale(name: string, storeid: number, sku: string, cost: number, price: number, stock: number, onsale: number, code?: string, desc?: string, disc?: number, promoprice?: string, promostartdate?: string, promoenddate?: string, warrantyperiod?: number, stockthreshold?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createSale(name: string, storeid: number, sku: string, cost: number, price: number, stock: number, onsale: number, code?: string, desc?: string, disc?: number, promoprice?: string, promostartdate?: string, promoenddate?: string, warrantyperiod?: number, stockthreshold?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createSale(name: string, storeid: number, sku: string, cost: number, price: number, stock: number, onsale: number, code?: string, desc?: string, disc?: number, promoprice?: string, promostartdate?: string, promoenddate?: string, warrantyperiod?: number, stockthreshold?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createSale(name: string, storeid: number, sku: string, cost: number, price: number, stock: number, onsale: number, code?: string, desc?: string, disc?: number, promoprice?: string, promostartdate?: string, promoenddate?: string, warrantyperiod?: number, stockthreshold?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling createSale.');
        }
        if (storeid === null || storeid === undefined) {
            throw new Error('Required parameter storeid was null or undefined when calling createSale.');
        }
        if (sku === null || sku === undefined) {
            throw new Error('Required parameter sku was null or undefined when calling createSale.');
        }
        if (cost === null || cost === undefined) {
            throw new Error('Required parameter cost was null or undefined when calling createSale.');
        }
        if (price === null || price === undefined) {
            throw new Error('Required parameter price was null or undefined when calling createSale.');
        }
        if (stock === null || stock === undefined) {
            throw new Error('Required parameter stock was null or undefined when calling createSale.');
        }
        if (onsale === null || onsale === undefined) {
            throw new Error('Required parameter onsale was null or undefined when calling createSale.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }
        if (storeid !== undefined && storeid !== null) {
            queryParameters = queryParameters.set('storeid', <any>storeid);
        }
        if (code !== undefined && code !== null) {
            queryParameters = queryParameters.set('code', <any>code);
        }
        if (sku !== undefined && sku !== null) {
            queryParameters = queryParameters.set('sku', <any>sku);
        }
        if (desc !== undefined && desc !== null) {
            queryParameters = queryParameters.set('desc', <any>desc);
        }
        if (cost !== undefined && cost !== null) {
            queryParameters = queryParameters.set('cost', <any>cost);
        }
        if (price !== undefined && price !== null) {
            queryParameters = queryParameters.set('price', <any>price);
        }
        if (disc !== undefined && disc !== null) {
            queryParameters = queryParameters.set('disc', <any>disc);
        }
        if (promoprice !== undefined && promoprice !== null) {
            queryParameters = queryParameters.set('promoprice', <any>promoprice);
        }
        if (promostartdate !== undefined && promostartdate !== null) {
            queryParameters = queryParameters.set('promostartdate', <any>promostartdate);
        }
        if (promoenddate !== undefined && promoenddate !== null) {
            queryParameters = queryParameters.set('promoenddate', <any>promoenddate);
        }
        if (stock !== undefined && stock !== null) {
            queryParameters = queryParameters.set('stock', <any>stock);
        }
        if (warrantyperiod !== undefined && warrantyperiod !== null) {
            queryParameters = queryParameters.set('warrantyperiod', <any>warrantyperiod);
        }
        if (stockthreshold !== undefined && stockthreshold !== null) {
            queryParameters = queryParameters.set('stockthreshold', <any>stockthreshold);
        }
        if (onsale !== undefined && onsale !== null) {
            queryParameters = queryParameters.set('onsale', <any>onsale);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.post<any>(`${this.configuration.basePath}/api/sale`,
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
     * Set sale\&#39;s \&#39;status\&#39; to 0.
     * @param uid Sale ID, NOT \&#39;ID\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteSaleByUid(uid: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteSaleByUid(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteSaleByUid(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteSaleByUid(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling deleteSaleByUid.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.delete<any>(`${this.configuration.basePath}/api/sale/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Filter list of sales
     * Returns list of filtered sales
     * @param page_number Page number
     * @param page_size Page size
     * @param keyword Keyword for filter
     * @param fromdate From Date for filter
     * @param todate To string for filter
     * @param status status for filter
     * @param onsale onsale for filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public filterSaleList(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, onsale?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public filterSaleList(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, onsale?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public filterSaleList(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, onsale?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public filterSaleList(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, onsale?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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
        if (onsale !== undefined && onsale !== null) {
            queryParameters = queryParameters.set('onsale', <any>onsale);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/filter/sale`,
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
     * Retrieves sale by Uid.
     * @param uid Sale_ID, NOT \&#39;ID\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getSaleByUid(uid: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getSaleByUid(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getSaleByUid(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getSaleByUid(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling getSaleByUid.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/sale/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get list of sales
     * Returns list of sales
     * @param page_number Page number.
     * @param page_size Page size.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getSaleList(page_number?: number, page_size?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getSaleList(page_number?: number, page_size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getSaleList(page_number?: number, page_size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getSaleList(page_number?: number, page_size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/sale`,
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
     * Update sale by Uid.
     * @param uid Sale_ID, NOT \&#39;ID\&#39;.
     * @param name Salename
     * @param storeid Store ID
     * @param userid User ID
     * @param sku totalqty
     * @param totalcost All Product Cost
     * @param totaldisc Total Discount
     * @param stock Stock Qty
     * @param stockthreshold Stock Threshold
     * @param onsale On Sale
     * @param sono Sale Order No
     * @param linetotal Line Total
     * @param disc Product Discount
     * @param promoprice Promotion Price
     * @param promostartdate Promotion Start Date
     * @param promoenddate Promotion End Date
     * @param warrantyperiod Warranty Period
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateSaleByUid(uid: string, name: string, storeid: number, userid: number, sku: number, totalcost: number, totaldisc: number, stock: number, stockthreshold: number, onsale: number, sono?: string, linetotal?: number, disc?: number, promoprice?: string, promostartdate?: string, promoenddate?: string, warrantyperiod?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateSaleByUid(uid: string, name: string, storeid: number, userid: number, sku: number, totalcost: number, totaldisc: number, stock: number, stockthreshold: number, onsale: number, sono?: string, linetotal?: number, disc?: number, promoprice?: string, promostartdate?: string, promoenddate?: string, warrantyperiod?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateSaleByUid(uid: string, name: string, storeid: number, userid: number, sku: number, totalcost: number, totaldisc: number, stock: number, stockthreshold: number, onsale: number, sono?: string, linetotal?: number, disc?: number, promoprice?: string, promostartdate?: string, promoenddate?: string, warrantyperiod?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateSaleByUid(uid: string, name: string, storeid: number, userid: number, sku: number, totalcost: number, totaldisc: number, stock: number, stockthreshold: number, onsale: number, sono?: string, linetotal?: number, disc?: number, promoprice?: string, promostartdate?: string, promoenddate?: string, warrantyperiod?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling updateSaleByUid.');
        }
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling updateSaleByUid.');
        }
        if (storeid === null || storeid === undefined) {
            throw new Error('Required parameter storeid was null or undefined when calling updateSaleByUid.');
        }
        if (userid === null || userid === undefined) {
            throw new Error('Required parameter userid was null or undefined when calling updateSaleByUid.');
        }
        if (sku === null || sku === undefined) {
            throw new Error('Required parameter sku was null or undefined when calling updateSaleByUid.');
        }
        if (totalcost === null || totalcost === undefined) {
            throw new Error('Required parameter totalcost was null or undefined when calling updateSaleByUid.');
        }
        if (totaldisc === null || totaldisc === undefined) {
            throw new Error('Required parameter totaldisc was null or undefined when calling updateSaleByUid.');
        }
        if (stock === null || stock === undefined) {
            throw new Error('Required parameter stock was null or undefined when calling updateSaleByUid.');
        }
        if (stockthreshold === null || stockthreshold === undefined) {
            throw new Error('Required parameter stockthreshold was null or undefined when calling updateSaleByUid.');
        }
        if (onsale === null || onsale === undefined) {
            throw new Error('Required parameter onsale was null or undefined when calling updateSaleByUid.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }
        if (storeid !== undefined && storeid !== null) {
            queryParameters = queryParameters.set('storeid', <any>storeid);
        }
        if (userid !== undefined && userid !== null) {
            queryParameters = queryParameters.set('userid', <any>userid);
        }
        if (sono !== undefined && sono !== null) {
            queryParameters = queryParameters.set('sono', <any>sono);
        }
        if (sku !== undefined && sku !== null) {
            queryParameters = queryParameters.set('sku', <any>sku);
        }
        if (linetotal !== undefined && linetotal !== null) {
            queryParameters = queryParameters.set('linetotal', <any>linetotal);
        }
        if (totalcost !== undefined && totalcost !== null) {
            queryParameters = queryParameters.set('totalcost', <any>totalcost);
        }
        if (totaldisc !== undefined && totaldisc !== null) {
            queryParameters = queryParameters.set('totaldisc', <any>totaldisc);
        }
        if (disc !== undefined && disc !== null) {
            queryParameters = queryParameters.set('disc', <any>disc);
        }
        if (promoprice !== undefined && promoprice !== null) {
            queryParameters = queryParameters.set('promoprice', <any>promoprice);
        }
        if (promostartdate !== undefined && promostartdate !== null) {
            queryParameters = queryParameters.set('promostartdate', <any>promostartdate);
        }
        if (promoenddate !== undefined && promoenddate !== null) {
            queryParameters = queryParameters.set('promoenddate', <any>promoenddate);
        }
        if (stock !== undefined && stock !== null) {
            queryParameters = queryParameters.set('stock', <any>stock);
        }
        if (warrantyperiod !== undefined && warrantyperiod !== null) {
            queryParameters = queryParameters.set('warrantyperiod', <any>warrantyperiod);
        }
        if (stockthreshold !== undefined && stockthreshold !== null) {
            queryParameters = queryParameters.set('stockthreshold', <any>stockthreshold);
        }
        if (onsale !== undefined && onsale !== null) {
            queryParameters = queryParameters.set('onsale', <any>onsale);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.put<any>(`${this.configuration.basePath}/api/sale/${encodeURIComponent(String(uid))}`,
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
